import { h, reactive, resolveComponent } from 'vue';
import { useForm as useInertiaForm } from '@inertiajs/inertia-vue3';
import { TForm, TuseForm } from '../index';

const useForm : TuseForm = function(route, model, { method = 'put' }) {
    const inertiaForm = useInertiaForm(model);

    let form = reactive({
        ...inertiaForm,
        submit(e) {
            if(e instanceof Event) {
                e.preventDefault();
            }

            this.__submit(method, route);
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