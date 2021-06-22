import { h, resolveComponent } from "vue";
import { TFormCheckboxes } from "../..";

const FormCheckboxes : TFormCheckboxes = function({form, attribute, checkboxComponent, options}) {
    const CheckBoxComponent = resolveComponent(checkboxComponent.name);
    let children = [];
    let updateFormValue = (e, value) => {
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
    
        form[attribute] = original;
    }
    

    for(let value in options) {
        let id = value;
        let Checkbox = h(CheckBoxComponent, {
            ...checkboxComponent.props,
            id,
            onInput: e => updateFormValue(e, value)
        });
        let Label = h(`label`, {for: id, innerHtml: options[value]});
        children.push(h(`template`, {
            key:value
        }, [Checkbox, Label]));
    }

    return children;
};

export default FormCheckboxes;