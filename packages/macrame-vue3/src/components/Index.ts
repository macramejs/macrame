import { resolveComponent, ref, h, reactive } from "vue";
import { TIndexSearch, TIndexTable, TIndexPagination, TuseIndex } from "../..";
import { Component } from "@macramejs/macrame";
const debounce = require('lodash.debounce');

export const IndexSearch: TIndexSearch = function ({ hasSearch, table, as = 'ui-input' }, { attrs }) {
    if(! hasSearch) {
        return;
    }

    return h(resolveComponent(as), {
        ...attrs,
        table,
        modelValue: table.search,
        'onUpdate:modelValue': debounce((e) => table.updateSearch(e), 200)
    });
}

export const IndexTable: TIndexTable = function ({ as = 'ui-table' }, { attrs }) {
    return h(resolveComponent(as), { ...attrs });
}

export const IndexPagination: TIndexPagination = function ({ as = 'ui-pagination' }, { attrs }) {
    return h(resolveComponent(as), { ...attrs });
}

const useIndex: TuseIndex = function useIndex({ route, syncUrl = false, defaultPerPage = 10 }) {
    let index = reactive({
        busy: false,
        perPage: defaultPerPage,
        items: [],
        hasNextPage: false,
        hasPrevPage: false,
        currentPage: 1,
        filters: [],
        search: "",
        fromItem: 0,
        toItem: 0,
        totalItems: 0,
        loadItems() {
            this.busy = true;

            fetch(this.__getUrl())
                .then(response => response.json())
                .then((data) => this.__update(data))
                .catch(() => this.busy = false);
        },
        reload() {
            return this.loadItems();
        },
        addFilter(filter) {
            this.filters.push(filter);
            this.reload();
        },
        removeFilter(filter) {
            //
            this.reload();
        },
        getLastPage() {
            return Math.ceil(this.totalItems / this.perPage);
        },
        setPage(newPage) {
            if (this.newPage < 1 || this.newPage > this.getLastPage()) {
                return;
            }

            this.currentPage = newPage;

            this.reload();
        },
        nextPage() {
            this.setPage(this.currentPage + 1);
        },

        prevPage() {
            this.setPage(this.currentPage - 1);
        },

        lastPage() {
            this.setPage(this.getLastPage());
        },
        updateSearch(e) {
            if(e instanceof Event) {
                this.search = (<HTMLTextAreaElement>e.target).value;
            } else {
                this.search = e;
            }

            this.setPage(1);
        },
        __update(data) {
            this.items = data.data;
            this.totalItems = data.meta.total;
            this.fromItem = data.meta.from;
            this.toItem = data.meta.to;
            this.perPage = data.meta.per_page;
            this.hasNextPage = this.currentPage < this.getLastPage();
            this.hasPrevPage = this.currentPage > 1;

            this.busy = false;
        },
        __getUrl() {
            let params = [
                `page=${this.currentPage}`,
                `search=${encodeURIComponent(this.search)}`
            ];

            for (let i = 0; i < this.filters.length; i++) {
                params.push(`fitlers[]=${encodeURIComponent(this.filters[i])}`);
            }

            return `${route}?${params.join('&')}`;
        }
    });

    return index;
};

export default useIndex;