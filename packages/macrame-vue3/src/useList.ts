import {ref} from "vue";
import {UseList, Model} from "../index";

const useList : UseList = (list = []) => {
    return ref(list);
}

export default useList;