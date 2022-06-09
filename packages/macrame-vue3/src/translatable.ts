import {reactive, watch, ref} from "vue";
import {Translatable} from "../index";

function getValue(values, locale) {
    return (values.value)[locale.value] || null;
}

const translatable : Translatable = (locale, values, onChange) => {
    const vals = ref(values || {});
    const val = ref(getValue(vals, locale));

    watch(vals, (v) => onChange(v), {deep: true});
    watch(locale, () => val.value = getValue(vals, locale), {deep: true});
    watch(val, (v) => vals.value[locale.value] = v);

    return val;
}

export default translatable;