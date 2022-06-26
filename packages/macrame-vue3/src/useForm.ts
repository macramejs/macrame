import * as _ from 'lodash';
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
        isSubmitting: false,
        isLoading: false,
        original: useOriginal(data),
        __id: undefined,
        load(id) {
            this.isLoading = true;
            this.__id = id;

            return load(id)
                .then(response => {
                    this.setData(response.data.data);
                    this.isLoading = false;

                    return response;
                })
                .catch(e => {
                    this.isLoading = false;
                    throw e;
                });
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
            this.isDirty = false;
        },
        async submit(e) {
            if (e instanceof Event) {
                e.preventDefault();
            }

            this.isSubmitting = true;

            const data = transform(form.data());

            return submit(data, form.__id)
                .then(response => {
                    form.errors = {};
                    form.original.update(form.data());

                    this.isSubmitting = false;

                    return response;
                })
                .catch(e => {
                    let data = e.response.data;

                    if ('errors' in data) {
                        form.errors = data.errors;
                    }

                    this.isSubmitting = false;

                    throw e;
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
