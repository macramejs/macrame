import { SpawnOptionsWithStdioTuple } from 'child_process';
import { reactive, watch } from 'vue';

import { UseState } from '../index';

const useState: UseState = (value, { load }) => {
    return reactive({
        value,
        isLoading: false,
        isLoaded: false,
        load() {
            this.isLoading = true;

            return load
                .apply(null, arguments)
                .then(response => {
                    this.value = response.data.data;
                    this.isLoading = false;
                    this.isLoaded = true;

                    return this.value;
                })
                .catch(e => {
                    this.isLoading = false;
                    throw e;
                });
        },
    });
};

export default useState;
