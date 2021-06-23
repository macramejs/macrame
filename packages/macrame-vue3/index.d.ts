import * as Macrame from '@macramejs/macrame'
import { DefineComponent, FunctionalComponent, Plugin } from 'vue'
import { InertiaForm } from '@inertiajs/inertia-vue3';

type Data = Record<string, any|undefined>;
type Model = Record<string, any>;

export const plugin: Plugin;

type TMacrameForm<TItem = Model> =  {
    submit(e?: Event | any): void,
    get: undefined,
    post: undefined,
    put: undefined,
    patch: undefined,
    delete: undefined,
} & InertiaForm<TItem>

type TuseForm<TItem = Model> = (props: Macrame.UseFormProps) => TMacrameForm<TItem>;
export const useForm : TuseForm;

type TFormProps = Macrame.FormProps & {
    form: TMacrameForm
}
type TForm = FunctionalComponent<TFormProps>;
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

type TIndexSearch = FunctionalComponent<Macrame.IndexSearchProps & {
    table: Index
}>;
export const IndexSearch : TIndexSearch;

type TIndexTable = FunctionalComponent<Macrame.IndexTableProps>;
export const IndexTable : TIndexTable;

type TIndexPagination = FunctionalComponent<Macrame.IndexPaginationProps>
export const IndexPagination : TIndexPagination;

type TFormInput = FunctionalComponent<Macrame.FormInputProps<InertiaForm<Record<string, any>>>>;
export const FormInput : TFormInput;

type TFormSelect = FunctionalComponent<Macrame.FormSelectProps<InertiaForm<Record<string, any>>>>;
export const FormSelect : TFormSelect;

type TFormTextarea = FunctionalComponent<Macrame.FormTextareatProps<InertiaForm<Record<string, any>>>>;
export const FormTextarea : TFormTextarea;

type TFormCheckboxes = FunctionalComponent<Macrame.FormCheckboxesProps<InertiaForm<Record<string, any>>>>;
export const FormCheckboxes : TFormCheckboxes;

type TTd = FunctionalComponent<Macrame.TdProps>;
export const Td : TTd;

type TTh = FunctionalComponent<Macrame.ThProps>;
export const Th : TTh;

type TTextarea = FunctionalComponent<Data>;
export const Textarea : TTextarea;

type TInput = FunctionalComponent<Data>;
export const Input : TInput;

type TSelect = FunctionalComponent<Data>;
export const Select : TSelect;

type TCheckbox = FunctionalComponent<Data>;
export const Checkbox : TCheckbox;

type TFieldTitle = FunctionalComponent<Macrame.FieldTitleProps>;
export const FieldTitle : TFieldTitle;