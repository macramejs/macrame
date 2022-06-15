import { reactive, watch } from 'vue';
import { UseForm } from '../index';
import useOriginal from './useOriginal';

const useForm : UseForm = function({ 
    data,
    submit,
    transform = (data) => data,
    onClean = () => {},
    onDirty = () => {},
}) {
    let form = reactive({
        ...data,
        errors: {},
        isDirty: false,
        original: useOriginal(data),
        data() {
            return Object.keys(data).reduce((carry, key) => {
                carry[key] = this[key]
                return carry
            }, {});
        },
        async submit(e) {
            if(e instanceof Event) {
                e.preventDefault();
            }

            this.busy = true;

            const data = transform(this.data())

            return submit(data)
                .then((response) => {
                    this.errors = {};
                    this.original.update(this.data());

                    return new Promise(() => response);
                })
                .catch((error) => {
                    let data = error.response.data;

                    if('errors' in data) {
                        this.errors = data.errors;
                    }

                    throw error;
                })
                .finally(() => {
                    this.busy = false;
                });
        },
    });

    watch(form, () => {
        form.isDirty = form.original.matches(form.data());

        if(form.isDirty) {
            onDirty(form);
        } else {
            onClean(form);
        }
    }, { immediate: true, deep: true })

    return form;
}

export default useForm;