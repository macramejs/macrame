type Model = Record<string, any>;

export declare interface Component {
    name: string,
    props: Record<string, any>
}

export declare interface UseFormProps {
    model: Record<string, any>, 
    attributes: string[], 
    route: string, 
    store: boolean
}

type UseFormAttrs = Record<keyof UseFormProps, any>;

export declare interface FormProps {
    schema: Component[],
}

export declare interface UseIndexProps {
    route: string,
    syncUrl: boolean,
    defaultPerPage: number,
}

type UseIndexAttrs = Record<keyof UseIndexProps, any>;

export declare type IndexSearchProps = {
    searchComponent: Component
}

export declare interface IndexTableProps {
    tableComponent: Component
}

export declare interface IndexPaginationProps {
    paginationComponent: Component
}

export declare interface FormInputProps<TForm> {
    form: TForm,
    attribute: string,
    inputComponent: Component
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