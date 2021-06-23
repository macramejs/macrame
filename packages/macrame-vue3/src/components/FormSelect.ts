import { resolveComponent, h } from 'vue';
import { TFormSelect } from '../..';

const FormSelect : TFormSelect = function({ form, attribute, selectComponent }) {
    const Input = resolveComponent(selectComponent.name);

    return h(Input, {
        ...selectComponent.props,
        modelValue: form[attribute],
        'onUpdate:modelValue': (value) => form[attribute] = value,
    });
}

export default FormSelect;
