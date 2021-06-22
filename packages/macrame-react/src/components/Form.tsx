import { useForm } from '@inertiajs/inertia-react';
import { Component } from '../components';
import pickBy from 'lodash.pickby';

export const Form = ({ model, attributes, route, schema }) => {
    const form = useForm(
        pickBy(model, (value, key) => attributes.includes(key))
    );

    function submit(e) {
        e.preventDefault();
        form.put(route);
    }

    return (
        <form onSubmit={submit}>
            {schema.map((component, i) => (
                <Component
                    key={i}
                    is={component.name}
                    {...component.props}
                    form={form}
                />
            ))}
            <button onClick={submit}>Save</button>
        </form>
    );
};

export default Form;
