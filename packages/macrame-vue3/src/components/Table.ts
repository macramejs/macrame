import { h, resolveComponent } from 'vue';
import { TTh, TTd } from '../..';
import { Component } from '@macramejs/macrame'

function render(value: string | Component, props: object) {
    if(typeof value === 'object' && value !== null && 'name' in value && 'props' in value) {
        const Component = resolveComponent(value.name);

        return h(Component, {
            ...props
        });
    }

    return value;
}

export const Th : TTh = function({ column }, { attrs }) {
    return h(`th`, {}, column.label);
}

export const Td : TTd = function({ item, column }) {
    return h(`td`, {}, item[column.value]);
}
