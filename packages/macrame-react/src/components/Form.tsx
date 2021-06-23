import { useForm as useInertiaForm } from '@inertiajs/inertia-react';
import { Component } from '../components';
import { TForm, TuseForm } from '../..';
import * as pickBy from 'lodash.pickby';

export const Form: TForm = ({ schema, form }) => {
    return (
        <form onSubmit={(e) => form.submit(e)}>
            {schema.map((component, i) => (
                <Component
                    props={component.props}
                    name={component.name}
                    key={i}
                    form={form}
                />
            ))}
            <button onClick={(e) => form.submit(e)}>Save</button>
        </form>
    );
};

const useForm: TuseForm = function({ model, attributes, route, store }) {
    const inertiaForm = useInertiaForm(
        pickBy(model, (value, key) => attributes.includes(key))
    );

    return {
        ...inertiaForm,
        submit(e) {
            if(e instanceof Event) {
                e.preventDefault();
            }

            return this.__submit(store ? 'post' : 'put', route);
        },
        get: undefined,
        post: undefined,
        put: undefined,
        patch: undefined,
        delete: undefined,
        __submit: inertiaForm.submit
    }
}

export default useForm;
