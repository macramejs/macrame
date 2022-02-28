import { reactive, watch } from "vue";
import {UseList, Model, TList} from "../index";
import { useOriginal } from "./index";
const uuid = require('uuid').v4;

function parseOrderRecursive(list: TList) {
    let order = [];

    for (let i = 0; i < list.items.length; i++) {
        order.push({
            id: list.items[i].value.id,
            children: parseOrderRecursive(list.items[i].children),
        });
    }

    return order;
}

const useList : UseList = (items = [], options = {}) => {
    const list = reactive({
        items: [],
        onOrderChange: options.onOrderChange ? options.onOrderChange : (order) => {},
        push(item, children = []) {
            this.items.push({
                children: useList(children),
                value: item,
            })
        },
        pop() {
            return this.items.pop();
        },
        setItems(list) {
            let items = [];

            for(let i = 0;i<list.length;i++) {
                items.push({
                    children: useList(list[i].children),
                    uuid: uuid(),
                    value: list[i].value
                });
            }

            this.items = items;
        },
        updateOnChange(items) {
            watch(
                () => items,
                () => list.setItems(items),
                { immediate: true, deep: true }
            );
        },
        getOrder() {
            return parseOrderRecursive(this);
        }
    });

    list.setItems(items);

    const originalOrder = useOriginal(list.getOrder);
    
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
}

export default useList;