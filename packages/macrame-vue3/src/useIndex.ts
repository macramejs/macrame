import { ref, reactive, watch } from "vue";
import { UseIndex } from "../index";

const defaultTransformFilters = filters => {
    for (let key in filters) {
        filters[key] = filters[key].value;
    }

    return filters;
}

const useIndex: UseIndex = function useIndex({ 
    route, 
    syncUrl = false, 
    defaultPerPage = 10, 
    filters = {}, 
    sortBy = {},
    transformFilters = defaultTransformFilters
}) {
    const search = ref<string>("");

    let index = reactive({
        processing: false,
        perPage: defaultPerPage,
        items: [],
        hasNextPage: false,
        hasPrevPage: false,
        currentPage: 1,
        search: search,
        fromItem: 0,
        toItem: 0,
        totalItems: 0,
        __route: route,
        __hooks: {
            beforeUpdate: [],
            afterUpdate: [],
        },
        filters: reactive(filters),
        sortBy: reactive(sortBy),
        loadItems() {
            this.processing = true;

            for(let i in this.__hooks.beforeUpdate) {
                this.__hooks.beforeUpdate[i](this);
            }

            fetch(this.__getUrl())
                .then(response => response.json())
                .then((data) => this.__update(data))
                .catch(() => this.processing = false);
        },
        reloadOnChange(value) {
            watch(value, () => this.reload());
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
            console.log({e});
            if(e instanceof Event) {
                this.search = (<HTMLTextAreaElement>e.target).value;
            } else {
                this.search = e;
            }

            this.setPage(1);
        },
        isSortedBy(key, direction = null) {
            if(direction == 'desc' || direction == 'asc') {
                return this.sortBy.includes(`${key}.${direction}`);
            } 

            return this.sortBy.includes(`${key}.desc`) || this.sortBy.includes(`${key}.asc`);
        },
        addSortBy(key, direction = 'asc') {
            let value = `${key}.${direction}`;

            if(this.isSortedBy(key, direction == 'asc' ? 'decs' : 'asc')) {
                this.removeSortBy(key);
            }

            if(!this.sortBy.includes(value)) {
                this.sortBy.push(value);
            }
        },
        removeSortBy(key) {
            let index = this.sortBy.indexOf(`${key}.desc`);
            if(index > -1) {
                this.sortBy.splice(index);
            }
            
            index = this.sortBy.indexOf(`${key}.asc`);
            if(index > -1) {
                this.sortBy.splice(index)
            }
        },
        beforeUpdate(cb) {
            this.__hooks.beforeUpdate.push(cb)
        },
        onUpdate(cb) {
            this.__hooks.afterUpdate.push(cb)
        },
        __update(data) {
            this.items = data.data;
            this.totalItems = data.meta.total;
            this.fromItem = data.meta.from;
            this.toItem = data.meta.to;
            this.perPage = data.meta.per_page;
            this.hasNextPage = this.currentPage < this.getLastPage();
            this.hasPrevPage = this.currentPage > 1;

            this.processing = false;

            this.__syncUrl();

            for(let i in this.__hooks.afterUpdate) {
                this.__hooks.afterUpdate[i](this);
            }
        },
        __syncUrl() {
            if(! syncUrl) {
                return;
            }

            let prefix = '';

            if(typeof syncUrl === 'string') {
                prefix = `${syncUrl}`;
            }

            let params = {};
            let p = this.__getParams();
            for(let key in p) {
                params[prefix+key] = p[key];
            }

            console.log(params);
        },
        __getUrl() {
            const params = new URLSearchParams(this.__getParams());

            for(let i=0;i<this.sortBy.length;i++) {
                params.append('sortBy[]', this.sortBy[i]);
            }
            
            return `${this.__route}?${params.toString()}`;
        },
        __getParams() {
            let params = {
                page: this.currentPage,
                search: this.search,
            };

            let filters = JSON.parse(JSON.stringify(this.filters));

            if(transformFilters) {
                filters = transformFilters(filters);
            }

            for(let key in filters) {
                if(!filters[key]) {
                    continue;
                }

                params[`filter.${key}`] = filters[key];
            }
            
            for(let key in params) {
                params[key] = encodeURIComponent(params[key]);
            }

            return params;
        }
    });

    index.reloadOnChange(search);

    return index;
};

export default useIndex;