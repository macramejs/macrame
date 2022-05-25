import {reactive, watch, ref} from "vue";
import {Translatable} from "../index";

const translatable : Translatable = (values, locale) => {
    const translatable = reactive({
        value: values[locale.value] || null,
        values,
        locale,
        setLocale(locale) {
            this.locale = locale;  
        },
    });

    watch(
        () => translatable.locale,
        (locale) => {
            translatable.value = translatable.values[locale];
        },
        {
            // force eager callback execution
            immediate: true
        }
    );

    return translatable;
}

export default translatable;