import { h, reactive, watch } from 'vue';
import { useForm as useInertiaForm } from '@inertiajs/inertia-vue3';
import { UseForm } from '../index';

const useForm : UseForm = function({ 
    route,
    data,
    method = 'put',
    onClean = () => {},
    onDirty = () => {},
    onCancelToken = () => {},
    onBefore = () => {},
    onStart = () => {},
    onProgress = () => {},
    onFinish = () => {},
    onCancel = () => {},
    onSuccess = () => {},
    onError = () => {},
} = {}) {
    const inertiaForm = useInertiaForm(data);

    let defaults = JSON.stringify(data);

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

        if(form.isDirty) {
            onDirty(form);
        } else {
            onClean(form);
        }
    }, { immediate: true, deep: true })

    return form;
}

export default useForm;