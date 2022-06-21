import * as _ from "lodash";
import { ref, reactive, watch } from "vue";
import { UseIndex } from "../index";

const useIndex: UseIndex = function useIndex({ 
    load,
    filters = {},
    sortBy = {},
}) {
    const search = ref<string>("");

    let index = reactive({
        isBusy: false,

        items: [],
        totalItems: 0,
        
        perPage: 0,
        hasNextPage: false,
        hasPrevPage: false,
        currentPage: 1,
        lastPage: 1,
        fromItem: 0,
        toItem: 0,

        search: search,

        filters: filters,

        sortBy: sortBy,

        async load() {
            this.isBusy = true;

            return load(this.__getParams())
                .then(response => {
                    this.items = response.data.data;
                    this.totalItems = response.data.total;
                    this.perPage = response.data.per_page;
                    this.currentPage = response.data.current_page;
                    this.lastPage = response.data.last_page;
                    this.fromItem = response.data.from;
                    this.toItem = response.data.to;
                    this.hasNextPage = this.currentPage < this.lastPage;
                    this.hasPrevPage = this.currentPage > 1;

                    return new Promise(() => response);
                })
                .finally(() => this.isBusy = false);
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

            if(Array.isArray(value)) {
                this.filters[type] = [];
            } else if(typeof value === 'object') {
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
            search.value = e instanceof Event
                ? (e.target as HTMLTextAreaElement).value
                : e;

            this.setPage(1);
        },
        isSortedBy(key, direction = null) {
            if(!this.sortBy.includes(key)) return false;
            if(!this.sortBy[key]) return false;
            if(!direction) return true;

            return this.sortBy[key] == direction;
        },
        addSortBy(key, direction = 'asc') {
            this.sortBy[key] = direction;
            this.load();
        },
        removeSortBy(key) {
            delete this.sortBy[key];
            this.load();
        },
        __getParams() {
            let params = {
                page: this.currentPage,
                search: this.search,
                sortBy: this.sortBy,
            };

            for(let key in filters) {
                if(!filters[key]) {
                    continue;
                }
                
                params[`filter.${key}`] = 'transform' in filters[key] 
                    ? filters[key].transform(filters[key].value)
                    : filters[key].value; 
            }

            return params;
        }
    });

    index.reloadOnChange(search);

    return index;
};

export default useIndex;