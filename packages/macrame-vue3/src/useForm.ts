import { reactive, watch } from 'vue';
import { UseForm } from '../index';
import useOriginal from './useOriginal';

const useForm: UseForm = function ({
    data,
    submit,
    load = async id => {},
    transform = data => data,
    onDirty = () => {},
}) {
    let form = reactive({
        ...data,
        errors: {},
        isDirty: false,
        isBusy: false,
        isBusyLoading: false,
        original: useOriginal(data),
        __id: undefined,
        load(id) {
            this.isBusyLoading = true;
            this.__id = id;

            return load(id)
                .then(response => {
                    // this.setData(response.data.data);

                    this.setData(response.data.data);
                    return new Promise(() => response);
                })
                .finally(() => (this.isBusyLoading = false));
        },
        data() {
            return Object.keys(data).reduce((carry, key) => {
                carry[key] = this[key];
                return carry;
            }, {});
        },
        setData(newData) {
            Object.keys(data).forEach(key => (this[key] = newData[key]));
            this.original.update(this.data());
        },
        async submit(e) {
            if (e instanceof Event) {
                e.preventDefault();
            }

            form.isBusy = true;

            const data = transform(form.data());

            return submit(data, form.__id)
                .then(response => {
                    form.errors = {};
                    form.original.update(form.data());

                    return new Promise(() => response);
                })
                .catch(error => {
                    let data = error.response.data;

                    if ('errors' in data) {
                        form.errors = data.errors;
                    }

                    throw error;
                })
                .finally(() => {
                    form.isBusy = false;
                });
        },
    });

    onDirty.bind(form);

    watch(
        form,
        () => {
            form.isDirty = !form.original.matches(form.data());

            if (form.isDirty) {
                onDirty(form);
            }
        },
        { immediate: true, deep: true }
    );

    return form;
};

export default useForm;
