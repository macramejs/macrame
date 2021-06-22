import { resolveComponent, ref, h, reactive } from "vue";
import { TIndexSearch, TIndexTable, TIndexPagination, TuseIndex } from "../.."; 
const debounce = require('lodash.debounce');

export const IndexSearch : TIndexSearch = function({ searchComponent }, { attrs }) {
    return h(resolveComponent(searchComponent.name), {
        ...attrs,
        ...searchComponent.props,
    });
}

export const IndexTable : TIndexTable = function({ tableComponent }, { attrs }) {
    return h(resolveComponent(tableComponent.name), {
        ...attrs,
        ...tableComponent.props,
    });
}

export const IndexPagination : TIndexPagination = function({ paginationComponent }, { attrs }) {
    return h(resolveComponent(paginationComponent.name), {
        ...attrs,
        ...paginationComponent.props,
    });
}

const useIndex : TuseIndex = function useIndex({ route, syncUrl = false, defaultPerPage = 10 }) {
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
                .then(this.__update)
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
            if(this.newPage < 1 || this.newPage > this.getLastPage()) {
                return;
            }
    
            this.currentPage = newPage;
    
            this.reload();
        },
        nextPage() {
            this.setPage(this.currentPage+1);
        },
    
        prevPage() {
            this.setPage(this.currentPage-1);
        },

        lastPage() {
            this.setPage(this.getLastPage());
        },
        updateSearch: debounce((e) => {
            if(e instanceof Event) {
                this.search = (<HTMLTextAreaElement>e.target).value;
            } else {
                this.search = e;
            }
            
            this.reload();
        }, 500),
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
    
            for(let i=0;i<this.filters.length;i++) {
                params.push(`fitlers[]=${encodeURIComponent(this.filters[i])}`);
            }
    
            return `${route}?${params.join('&')}`;
        }
    });

    return index;
};

export default useIndex;