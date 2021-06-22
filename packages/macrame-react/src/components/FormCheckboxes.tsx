import { Component } from '../components';
import pickBy from 'lodash.pickby';
import { TFormCheckboxes } from '../..';



const FormCheckboxes: TFormCheckboxes = function ({ 
    options, 
    attribute, 
    form, 
    checkboxComponent, 
}) {
    function updateFormValue(e, value) {
        let original = form.data[attribute];
    
        if (!Array.isArray(original)) {
            original = [];
        }
    
        if (e.target.checked && !(value in original)) {
            original.push(value);
        }
    
        if (!e.target.checked) {
            original = original.filter((v) => !v == value);
        }
    
        form.setData(attribute, original);
    }

    let children = Object.keys(options).map((value, index) => {
        return (
            <div key={value}>
                <Component
                    name={checkboxComponent.name}
                    props={checkboxComponent.props}
                    id={value}
                    onChange={(e) => updateFormValue(e, value)}
                />
                <label
                    dangerouslySetInnerHTML={{ __html: options[value] }}
                    htmlFor={value}
                />
            </div>
        );
    });

    return <div>{children}</div>;
};

export default FormCheckboxes;
