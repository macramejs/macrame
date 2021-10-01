import { h, reactive, resolveComponent } from 'vue';
import { useForm as useInertiaForm } from '@inertiajs/inertia-vue3';
import { TForm, TuseForm } from '../index';
const pickBy = require('lodash.pickby').default;

const useForm : TuseForm = function({ model, attributes, route, store }) {
    const inertiaForm = useInertiaForm(
        pickBy(model, (value, key) => attributes.includes(key))
    );

    let form = reactive({
        ...inertiaForm,
        submit(e) {
            if(e instanceof Event) {
                e.preventDefault();
            }

            this.__submit(store ? 'post' : 'put', route);
        },
        get: undefined,
        post: undefined,
        put: undefined,
        patch: undefined,
        delete: undefined,
        __submit: inertiaForm.submit
    });

    return form;
}

export default useForm;