import * as _ from 'lodash';
import { reactive } from 'vue';
import { UseOriginal } from '../index';

export const clone = value => {
    return JSON.parse(JSON.stringify(value));
};

const useOriginal: UseOriginal = value => {
    const original = reactive({
        raw: clone(value),
        stringified: JSON.stringify(value),
        update(value) {
            this.raw = clone(value);
            this.stringified = JSON.stringify(value);
        },
        matches(value) {
            return JSON.stringify(value) == this.stringified;
        },
    });

    return original;
};

export default useOriginal;
