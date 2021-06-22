import { Component } from '../components';
import { TFormTextarea } from '../..'; 

const FormTextarea : TFormTextarea = ({ textareaComponent, form, attribute }) => {
    return (
        <Component
            name={textareaComponent.name}
            props={textareaComponent.props}
            value={form.data[attribute]}
            onChange={(e) => form.setData(attribute, e.target.value)}
        />
    );
};

export default FormTextarea;
