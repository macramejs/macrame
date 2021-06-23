import React from 'react';
import { Component } from '../components';
import { TFormSelect } from '../..';

const FormSelect : TFormSelect = ({ selectComponent, form, attribute }) => {
    return (
        <Component
            name={selectComponent.name}
            props={selectComponent.props}
            value={form.data[attribute]}
            onChange={(e) =>
                form.setData(attribute, e.target.value)
            }
        />
    );
};

export default FormSelect;