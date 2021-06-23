import React from 'react';
import { Component } from '../components';
import { TSelect } from '../..';

const Select : TSelect = ({ options, ...props }) => {
    console.log(Object.keys(options));
    return (
        <select {...props}>
            {Object.keys(options).map((value, i) => (
                <option key={value} value={value}>{options[value]}</option>
            ))}
        </select>
        
    );
};

export default Select;