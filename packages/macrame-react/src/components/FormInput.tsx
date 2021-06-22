import React from 'react';
import { Component } from '../components';
import { TFormInput } from '../..';

const FormInput : TFormInput = ({ inputComponent, form, attribute }) => {
    return (
        <Component
            name={inputComponent.name}
            props={inputComponent.props}
            value={form.data[attribute]}
            onChange={(e) =>
                form.setData(attribute, e.target.value)
            }
        />
    );
};

export default FormInput;