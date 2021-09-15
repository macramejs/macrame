import { ref, reactive, watch } from "vue";
import { TuseIndex } from "../..";

const useIndex: TuseIndex = function useIndex({ route, syncUrl = false, defaultPerPage = 10 }) {
    const search = ref<string>("");

    let index = reactive({
        busy: false,
        perPage: defaultPerPage,
        items: [],
        hasNextPage: false,
        hasPrevPage: false,
        currentPage: 1,
        filters: [],
        search: search,
        fromItem: 0,
        toItem: 0,
        totalItems: 0,
        __route: route,
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
            console.log({e});
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
                params.push(`filters[]=${encodeURIComponent(this.filters[i])}`);
            }

            return `${this.__route}?${params.join('&')}`;
        }
    });

    watch(search, () => {
        index.reload();
    });

    return index;
};

export default useIndex;