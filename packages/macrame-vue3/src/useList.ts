import {reactive} from "vue";
import {UseList, Model} from "../index";
const uuid = require('uuid').v4;

const useList : UseList = (list = []) => {
    let items = [];

    for(let i = 0;i<list.length;i++) {
        items.push({
            children: useList(items[i].children),
            uuid: uuid(),
            value: items[i].value
        });
    }

    return reactive({
        items,
        push(item, children = []) {
            this.items.push({
                children: useList(children),
                value: item,
            })
        },
        pop() {
            return this.items.pop();
        }
    });
}

export default useList;