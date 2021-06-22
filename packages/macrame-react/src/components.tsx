import React from 'react';
import pickBy from 'lodash.pickby';
import { TaddComponent, TComponent } from '..';

let components = {};

const addComponent : TaddComponent = (name, component) => {
    components[name] = component;
};

const use = (module) => {
    module.install(addComponent);
};

const Component : TComponent = function(props) {
    if (!(props.name in components)) {
        throw new Error(
            `No dynamic component with name [${props.name}] registered.`
        );
    }

    const Component = components[props.name];

    let passthru = pickBy(props, (value, key) => {
        return !['name', 'key', 'props'].includes(key);
    });

    return (
        <Component {...passthru} {...props} />
    );
};

export { addComponent, Component, use };
