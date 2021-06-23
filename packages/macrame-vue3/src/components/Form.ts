import { h, reactive, resolveComponent } from 'vue';
import { useForm as useInertiaForm } from '@inertiajs/inertia-vue3';
import { TForm, TuseForm } from '../..';

export const Form : TForm = function({ schema, form }) {
    let children = [];

    for(let i = 0;i<schema.length;i++) {
        let Child = resolveComponent(schema[i].name);

        children.push(h(Child, {
            ...schema[i].props,
            key:`f-${i}`,
            form
        }));
    }

    return h(`form`, {
        onSubmit: (e) => form.submit(e)
    }, children);
}

const useForm : TuseForm = function({ model, attributes, route, store }) {
    let data = Object.keys(model)
        .filter((key) => attributes.includes(key))
        .reduce((obj, key) => {
            obj[key] = model[key];
            return obj;
        }, {});

    const inertiaForm = useInertiaForm(data);

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