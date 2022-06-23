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

const useTree: UseTree = (items = [], options = {}) => {
    const list = reactive({
        items: [],
        onOrderChange: options.onOrderChange
            ? options.onOrderChange
            : order => {},
        push(item, children = []) {
            this.items.push({
                children: useTree(children),
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
                    children: useTree(list[i].children),
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

    list.updateOnChange = items => {
        watch(
            items,
            () => {
                list.setItems(typeof items === 'function' ? items() : items);
            },
            { immediate: true, deep: true }
        );
    };

    list.setItems(items);

    const originalOrder = useOriginal(list.getOrder());

    watch(
        list,
        () => {
            const order = list.getOrder();

            if (originalOrder.matches(order)) {
                return;
            }

            originalOrder.update(order);
            list.onOrderChange(order);
        },
        { immediate: true, deep: true }
    );

    return list;
};

export default useTree;
