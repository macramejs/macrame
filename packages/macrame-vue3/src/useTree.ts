import { reactive, watch } from 'vue';
import { UseTree, Model, Tree } from '../index';
import { useOriginal } from './index';
const uuid = require('uuid').v4;

function parseOrderRecursive(list: Tree) {
    let order = [];

    for (let i = 0; i < list.items.length; i++) {
        order.push({
            id: list.items[i].value.id,
            children: parseOrderRecursive(list.items[i].children),
        });
    }

    return order;
}

const useTree: UseTree = ({ items = [], load = async () => {} }) => {
    const list = reactive({
        items: [],
        isLoading: false,
        __changeHandlers: [],
        originalOrder: null,
        onOrderChange(handler) {
            this.__changeHandlers.push(handler);
        },
        load() {
            if (!load) throw new Error('Missing load function for tree.');

            this.isLoading = true;

            return load
                .apply(null, arguments)
                .then(response => {
                    this.setItems(response.data.data);
                    this.originalOrder = useOriginal(list.getOrder());
                    this.isLoading = false;

                    return response;
                })
                .catch(e => {
                    this.isBusyLoading = false;
                    throw e;
                });
        },
        push(item, children = []) {
            this.items.push({
                children: useTree({ items: children }),
                value: item,
            });
        },
        pop() {
            return this.items.pop();
        },
        setItems(list) {
            let items = [];

            for (let i = 0; i < list.length; i++) {
                items.push({
                    children: useTree({ items: list[i].children }),
                    uuid: uuid(),
                    value: list[i].value,
                });
            }

            this.items = items;
        },
        getOrder() {
            return parseOrderRecursive(this);
        },
    });

    list.setItems(items);

    list.updateOnChange = items => {
        watch(
            items,
            () => {
                list.setItems(typeof items === 'function' ? items() : items);
            },
            { immediate: true, deep: true }
        );
    };

    watch(
        () => list,
        () => {
            // skip when list is loading or initial order has not yet been set
            if (list.isLoading || !list.originalOrder) {
                return;
            }

            const order = list.getOrder();

            if (list.originalOrder.matches(order)) return;

            list.originalOrder.update(order);

            if (list.isLoading) return;

            for (let i = 0; i < list.__changeHandlers.length; i++) {
                list.__changeHandlers[i](order);
            }
        },
        { immediate: true, deep: true }
    );

    return list;
};

export default useTree;
