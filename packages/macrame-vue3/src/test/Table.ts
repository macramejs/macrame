import { defineComponent, ref } from "vue";

const template = `
    <component
        v-bind="tableComponent.props" 
        :is="tableComponent.name" 
        :busy="busy"
        :count="count"
        :items="items"
        @reload="reload"
    />
`;

const Table = defineComponent({
    template,
    props: {
        tableComponent: {
            type: Object,
            required: true
        },
        syncUrl: {
            type: Boolean,
        },
        route: {
            type: String,
            required: true,
        },
    },
    setup(props) {
        let busy = ref(false);
        let items = ref([]);
        let count = ref(0);

        let filters = [];
        let search = "";
        let page = 1;

        function loadItems() {
            this.busy = true;
            fetch(props.route)
                .then(response => response.json())
                .then(json => {
                    this.items = json.data;
                    this.busy = false;
                })
                .catch(() => this.busy = false);
        }
        
        function reload() {
            loadItems();
        }

        function addFilter(newFilter) {
            filters.push(newFilter);
        }

        function removeFilter(removedFilter) {
            //
        }

        function updateSearch(newSearch) {
            search = newSearch;
        }

        function setPage(newPage) {
            page = newPage;
        }

        return { 
            busy, items, count,
            reload, addFilter, removeFilter, updateSearch, setPage 
        };
    },
});

export default Table;