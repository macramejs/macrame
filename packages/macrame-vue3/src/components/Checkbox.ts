import { h } from 'vue';
import { TCheckbox } from "../..";

const Checkox : TCheckbox = function({}, { attrs, emit }) {
    return h(`input`, {
        ...attrs,
        type: 'checkbox',
        value: attrs.modelValue,
        onInput: (e) => emit("update:modelValue", e.target.value),
    });
};

export default Checkox;
