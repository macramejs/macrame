import * as _ from 'lodash';
import { ref, reactive, watch } from 'vue';
import { UseIndex } from '../index';
import { clone } from './useOriginal';

const useIndex: UseIndex = function useIndex({
    load,
    filters = {},
    sortBy = [],
}) {
    const search = ref<string>('');

    let index = reactive({
        isLoading: false,
        items: [],
        meta: {},
        search,
        filters,
        sortBy,
        async load() {
            this.isLoading = true;

            return load(this.__getParams())
                .then(response => {
                    this.items = response.data.data;
                    this.meta = response.data.meta;

                    return response;
                })
                .finally(() => (this.isLoading = false));
        },
        reloadOnChange(value) {
            watch(value, () => this.load());
        },
        setFilter(type, value) {
            if (!this.filters[type]) {
                this.filters[type] = {};
            }
            this.filters[type].value = value;
            this.load();
        },
        removeFilter(type) {
            const value = this.filters[type].value;

            if (Array.isArray(value)) {
                this.filters[type] = [];
            } else if (typeof value === 'object') {
                this.filters[type] = {};
            } else {
                this.filters[type] = undefined;
            }

            this.load();
        },
        setPage(newPage) {
            if (this.newPage < 1 || this.newPage > this.lastPage) {
                return;
            }

            this.currentPage = newPage;
            this.load();
        },
        setNextPage() {
            this.setPage(this.currentPage + 1);
        },
        setPrevPage() {
            this.setPage(this.currentPage - 1);
        },
        setLastPage() {
            this.setPage(this.getLastPage());
        },
        updateSearch(e) {
            search.value =
                e instanceof Event
                    ? (e.target as HTMLTextAreaElement).value
                    : e;

            this.setPage(1);
        },
        isSortedBy(key, direction = null) {
            for (let i = 0; i < this.sortBy.length; i++) {
                let ordering = this.sortBy[i];

                if (!ordering || ordering.key != key) continue;

                return direction ? ordering.direction == direction : true;
            }
        },
        addSortBy(key, direction = 'asc') {
            this.removeSortBy(key, false);
            this.sortBy.push({ key, direction });

            this.load();
        },
        removeSortBy(key, reload = true) {
            const sorting = clone(this.sortBy);
            console.log(sorting);
            for (let i = 0; i < sorting.length; i++) {
                console.log(i, sorting);
                if (sorting[i].key == key) delete this.sortBy[i];
            }

            if (reload) this.load();
        },
        __getParams() {
            let params = {
                page: this.currentPage,
                search: this.search,
                sortBy: [],
            };

            this.sortBy.forEach(element => {
                params.sortBy.push(`${element.key}.${element.direction}`);
            });

            for (let key in this.filters) {
                if (!this.filters[key]) {
                    continue;
                }

                params[`filter.${key}`] =
                    'transform' in this.filters[key]
                        ? this.filters[key].transform(this.filters[key].value)
                        : this.filters[key].value;
            }

            for (let key in params) {
                if (!params[key]) delete params[key];
            }

            return params;
        },
    });

    index.reloadOnChange(search);

    return index;
};

export default useIndex;
