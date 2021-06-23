import * as Macrame from '@macramejs/macrame'
import { FunctionComponent, Component as ReactComponent } from 'react'
import { InertiaFormProps } from '@inertiajs/inertia-react';

type Data = Record<string, any|undefined>;
type Model = Record<string, any>;

type TaddComponent = (name: string, component: FunctionComponent | ReactComponent) => void;
type TPlugin = {
    install: (addComponent: TaddComponent) => void
}
export const plugin: TPlugin;

export declare function use(plugin: TPlugin);

type ReactComponentProps = Macrame.Component & {
    key?: unknown,
    [key: string]: any
}
type TComponent = FunctionComponent<ReactComponentProps>;
export const Component : TComponent;

type TMacrameForm<TItem = Model> =  {
    submit(e: Event | any): void,
    get: undefined,
    post: undefined,
    put: undefined,
    patch: undefined,
    delete: undefined,
} & InertiaFormProps<TItem>

type TuseForm<TItem = Model> = (props: Macrame.UseFormProps) => TMacrameForm<TItem>;
export const useForm : TuseForm;

type TFormProps = Macrame.FormProps & {
    form: TMacrameForm
}
type TForm = FunctionComponent<TFormProps>;
export const Form : TForm;

interface Index<TItem = any> {
    busy: boolean,
    perPage: number,
    items: TItem[],
    hasNextPage: boolean,
    hasPrevPage: boolean,
    currentPage: number,
    filters: any[],
    search: string,
    fromItem: number,
    toItem: number,
    totalItems: number,
    reload: () => void
    loadItems: () => void,
    addFilter: (filter: string) => void,
    removeFilter: (filter: string) => void,
    setPage: (page: number) => void
    nextPage: () => void,
    prevPage: () => void,
    lastPage: () => void,
    updateSearch: (e: string | object) => void
}
type TuseIndex<TItem = Model> = (props: Macrame.UseIndexProps) => Index<TItem>;
export const useIndex : TuseIndex;

type TIndexSearch = FunctionComponent<Macrame.IndexSearchProps & {
    table: Index
}>;
export const IndexSearch : TIndexSearch;

type TIndexTable = FunctionComponent<Macrame.IndexTableProps>;
export const IndexTable : TIndexTable;

type TIndexPagination = FunctionComponent<Macrame.IndexPaginationProps>
export const IndexPagination : TIndexPagination;

type TFormInput = FunctionComponent<Macrame.FormInputProps<InertiaFormProps<Record<string, any>>>>;
export const FormInput : TFormInput;

type TFormSelect = FunctionComponent<Macrame.FormSelectProps<InertiaFormProps<Record<string, any>>>>;
export const FormSelect : TFormSelect;

type TFormTextarea = FunctionComponent<Macrame.FormTextareatProps<InertiaFormProps<Record<string, any>>>>;
export const FormTextarea : TFormTextarea;

type TFormCheckboxes = FunctionComponent<Macrame.FormCheckboxesProps<InertiaFormProps<Record<string, any>>>>;
export const FormCheckboxes : TFormCheckboxes;

type TTd = FunctionComponent<Macrame.TdProps>;
export const Td : TTd;

type TTh = FunctionComponent<Macrame.ThProps>;
export const Th : TTh;

type TTextarea = FunctionComponent<Data>;
export const Textarea : TTextarea;

type TSelect = FunctionComponent<Data>;
export const Select : TSelect;

type TCheckbox = FunctionComponent<Data>;
export const Checkbox : TCheckbox;

type TFieldTitle = FunctionComponent<Macrame.FieldTitleProps>;
export const FieldTitle : TFieldTitle;