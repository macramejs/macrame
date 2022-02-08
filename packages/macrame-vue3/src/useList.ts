import {reactive} from "vue";
import {UseList, Model} from "../index";
const uuid = require('uuid').v4;

const useList : UseList = (l = []) => {
    const list = reactive({
        items: [],
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
        }
    });

    list.setItems(l);

    return list;
}

export default useList;