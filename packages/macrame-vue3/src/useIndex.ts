import * as _ from 'lodash';
import { ref, reactive, watch } from 'vue';
import { UseIndex } from '../index';

const useIndex: UseIndex = function useIndex({
    load,
    filters = {},
    sortBy = [],
}) {
    const search = ref<string>('');

    let index = reactive({
        isBusy: false,
        items: [],
        meta: {},
        search,
        filters,
        sortBy,
        async load() {
            this.isBusy = true;

            return load(this.__getParams())
                .then(response => {
                    this.items = response.data.data;
                    this.meta = response.data.meta;
                    this.hasNextPage = this.currentPage < this.lastPage;
                    this.hasPrevPage = this.currentPage > 1;

                    return new Promise(() => response);
                })
                .finally(() => (this.isBusy = false));
        },
        reloadOnChange(value) {
            watch(value, () => this.load());
        },
        setFilter(type, value) {
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

            this.reload();
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
            if (!this.sortBy.includes(key)) return false;
            if (!this.sortBy[key]) return false;
            if (!direction) return true;

            return this.sortBy[key] == direction;
        },
        addSortBy(key, direction = 'asc') {
            this.sortBy.push({ key, direction });
            this.load();
        },
        removeSortBy(key) {
            for (let i = 0; i < this.sortBy.length; i++) {
                if (this.sortBy[i].key == key) delete this.sortBy[i];
            }

            this.load();
        },
        __getParams() {
            let params = {
                page: this.currentPage,
                search: this.search,
                sortBy: [],
            };

            for (let i = 0; i < this.sortBy; i++) {
                params.sortBy.push(
                    `${this.sortBy[i].key}.${this.sortBy[i].direction}`
                );
            }

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
