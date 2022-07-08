import { reactive, watch } from 'vue';
import { UseTree, Model, Tree } from '../index';
import { useOriginal } from './index';
import { v4 as uuid } from 'uuid';

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

const useTree: UseTree = ({ items = [], load = async params => {} }) => {
    const list = reactive({
        items: [],
        isBusyLoading: false,
        __changeHandlers: [],
        onOrderChange(handler) {
            this.__changeHandlers.push(handler);
        },
        load(params) {
            if (!load) throw new Error('Missing load function for tree.');

            this.isBusyLoading = true;

            return load(params)
                .then(response => {
                    this.setItems(response.data.data);
                    this.isBusyLoading = false;
                    return new Promise(() => response);
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

    const originalOrder = useOriginal(list.getOrder());

    watch(
        () => list,
        () => {
            const order = list.getOrder();

            if (originalOrder.matches(order)) return;

            originalOrder.update(order);

            if (list.isBusyLoading) return;

            for (let i = 0; i < list.__changeHandlers.length; i++) {
                list.__changeHandlers[i](order);
            }
        },
        { immediate: true, deep: true }
    );

    return list;
};

export default useTree;
