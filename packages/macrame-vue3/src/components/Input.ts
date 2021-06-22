import { h } from 'vue';
import { TInput } from '../..';

export const Input : TInput = function({}, { attrs, emit }) {
    return h(`input`, {
        value: attrs.modelValue,
        onInput: ({ target }) => emit('update:modelValue', target.value),
    });
}

export default Input;