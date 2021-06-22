import { createElement } from 'react';
import { TFieldTitle } from '../..';

const FieldTitle : TFieldTitle = ({ title, hasTitle, titleTag }) => {
    if (!hasTitle) {
        return;
    }

    const Tag = (titleTag || 'h5');

    return createElement(Tag, {
        dangerouslySetInnerHTML: { __html: title }
    });
};

export default FieldTitle;
