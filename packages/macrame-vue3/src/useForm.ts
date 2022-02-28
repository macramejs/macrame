import { h, reactive, watch } from 'vue';
import { useForm as useInertiaForm } from '@inertiajs/inertia-vue3';
import { TForm, TuseForm } from '../index';

const useForm : TuseForm = function(route, model, { 
    method = 'put',
    onCancelToken = () => {},
    onBefore = () => {},
    onStart = () => {},
    onProgress = () => {},
    onFinish = () => {},
    onCancel = () => {},
    onSuccess = () => {},
    onError = () => {},
} = {}) {
    const inertiaForm = useInertiaForm(model);

    let defaults = JSON.stringify(model);

    let form = reactive({
        ...inertiaForm,
        submit(e) {
            if(e instanceof Event) {
                e.preventDefault();
            }
            
            this.__submit(method, route, {
                headers: { Accept: 'application/json' },
                onCancelToken, 
                onBefore, 
                onStart, 
                onProgress, 
                onFinish, 
                onCancel, 
                onSuccess, 
                onError
            });

            defaults = JSON.stringify(this.data());
        },
        get: undefined,
        post: undefined,
        put: undefined,
        patch: undefined,
        delete: undefined,
        __submit: inertiaForm.submit
    });

    watch(form, () => {
        form.isDirty = JSON.stringify(form.data()) != defaults
    }, { immediate: true, deep: true })

    return form;
}

export default useForm;