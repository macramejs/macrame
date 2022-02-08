import {reactive} from "vue";
import {UseOriginal} from "../index";

const useOriginal : UseOriginal = (value) => {
    const original = reactive({
        raw: value,
        stringified: JSON.stringify(value),
        update(value) {
            this.raw = value;
            this.stringified = JSON.stringify(value);
        },
        matches(value) {
            return JSON.stringify(value) == this.stringified;
        },
    });

    return original;
}

export default useOriginal;