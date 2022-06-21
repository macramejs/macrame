import { reactive, watch } from 'vue';
import { UseForm } from '../index';
import useOriginal from './useOriginal';

const useForm : UseForm = function({ 
    data,
    submit,
    load = async (id) => {},
    transform = (data) => data,
    onClean = () => {},
    onDirty = () => {},
}) {
    let form = reactive({
        ...data,
        errors: {},
        isDirty: false,
        isBusy: false,
        isBusyLoading: false,
        original: useOriginal(data),
        load(id) {
            this.isBusyLoading = true;

            return load(id)
                .then(response => {
                    Object.keys(data).forEach((key) => this[key] = response.data.data[key]);

                    return new Promise(() => response);
                })
                .finally(() => this.isBusyLoading = false);
        },
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

            this.isBusy = true;

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
                    this.isBusy = false;
                });
        },
    });

    onDirty.bind(form);

    watch(form, () => {
        form.isDirty = form.original.matches(form.data());

        if(form.isDirty) {
            onDirty(form);
        }

    }, { immediate: true, deep: true })

    return form;
}

export default useForm;