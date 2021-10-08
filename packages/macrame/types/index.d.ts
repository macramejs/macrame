type Model = Record<string, any>;

export declare interface Component {
    name: string,
    props?: Record<string, any>
}

export declare interface UseFormOptions {
    method?: boolean
}

type UseFormAttrs = Record<keyof UseFormOptions, any>;

export declare interface FormProps {
    schema: Component[],
}

export declare interface UseIndexProps {
    route: string,
    syncUrl: boolean,
    defaultPerPage: number,
    filters?: { [x: string]: any },
    transformFilters?: (filters: { [x: string]: any }) => { [x: string]: any }
}

type UseIndexAttrs = Record<keyof UseIndexProps, any>;

export declare type IndexSearchProps = {
    as: string,
    hasSearch: boolean
}

export declare interface IndexTableProps {
    as: string,
}

export declare interface IndexPaginationProps {
    as: string,
}

export declare interface FormInputProps<TForm> {
    form: TForm,
    attribute: string,
    inputComponent: Component
}

export declare interface FormSelectProps<TForm> {
    form: TForm,
    attribute: string,
    selectComponent: Component
}

export declare interface FormTextareatProps<TForm> {
    form: TForm,
    attribute: string,
    textareaComponent: Component
}

export declare interface FormCheckboxesProps<TForm> {
    form: TForm,
    attribute: string,
    checkboxComponent: Component,
    options: Record<string, string>
}

export declare interface FieldTitleProps {
    title: string,
    hasTitle: boolean,
    titleTag: string
}

export declare interface Column {
    label: string,
    value: string
}

export declare interface TdProps<Item = Model> {
    column: Column,
    item: Item
}

export declare interface ThProps {
    column: Column,
}

export type Ttranslate<M = Model> = (line: string, model: Model) => void;