import {reactive, watch} from "vue";
import {UseTranslatable} from "../index";

const useTranslatable : UseTranslatable = (values, locale) => {
    const translatable = reactive({
        value: values[locale] || null,
        values,
        locale,
        setLocale(locale) {
            this.locale = locale;  
        },
    });

    watch(translatable.locale, (locale) => {
        translatable.value = translatable.values[locale];
    });

    return translatable;
}

export default useTranslatable;