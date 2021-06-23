import { h } from 'vue';
import { TSelect } from '../..';

export const Select : TSelect = function({ options }, { attrs, emit, slots }) {
    let children = [];

    for(let value in options) {
        children.push(h('option', { value }, options[value]));
    }

    console.log(children, options);

    return h(`select`, {
        value: attrs.modelValue,
        onInput: ({ target }) => emit('update:modelValue', target.value),
    }, children);
}

export default Select;