import { h } from 'vue';
import { TInput } from '../index';
import { debounce } from 'lodash.debounce'

export const Input : TInput = function({ modelModifiers = {} }, { attrs = {}, emit }) {
    let onInput = ({ target }) => {
        emit('update:modelValue', target.value);
    }

    if(modelModifiers.debounce) {
        onInput = debounce(onInput, 200);
    }

    return h(`input`, {
        ...attrs,
        value: attrs.modelValue,
        onInput,
    });
}

export default Input;