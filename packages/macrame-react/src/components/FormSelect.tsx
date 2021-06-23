import React from 'react';
import { Component } from '../components';
import { TFormSelect } from '../..';

const FormSelect : TFormSelect = ({ selectComponent, form, attribute }) => {

    let update = (e) => {
        let data = e;

        if(e instanceof Event) {
            data = (e.target as HTMLTextAreaElement).value;
        }

        form.setData(attribute, data)
    }

    return (
        <Component
            name={selectComponent.name}
            props={selectComponent.props}
            value={form.data[attribute]}
            onChange={update}
        />
    );
};

export default FormSelect;