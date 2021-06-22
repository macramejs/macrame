import { defineComponent, ref } from "vue";

const template = `
    <div>
        <ui-select v-model="form[attribute]" :value="form[attribute]">
            <option
                :value="item[ownerKey]"
                v-for="(item, index) in items"
                :key="index"
            >
                {{ item[value] }}
            </option>
        </ui-select>
    </div>
`;


export default defineComponent({
    template,
    name: "LitRelationBelongsToSelect",
    props: ["form", "attribute", "indexRoute", "ownerKey", "value"],
    data() {
        return {
            items: [],
        };
    },
    beforeMount() {
        this.loadItems();
    },
    setup(props) {
        let items = ref([]);

        const loadItems = () => {
            fetch(props.indexRoute)
                .then((response) => response.json())
                .then((json) => items.value = json.data);
        };

        return { items, loadItems };
    },
});

