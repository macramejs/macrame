import * as Macrame from '@macramejs/macrame'
import { FunctionalComponent, Plugin, WatchSource, Ref } from 'vue'
import { InertiaForm, VisitOptions } from '@inertiajs/inertia-vue3';

type Data = Record<string, any|undefined>;
type Model = Record<string, any>;

export const plugin: Plugin;

type TMacrameForm<TItem> =  {
    submit(e?: Event | any): void,
    get: undefined,
    post: undefined,
    put: undefined,
    patch: undefined,
    delete: undefined,
} & InertiaForm<TItem>

type UseFormOptions = Macrame.UseFormOptions | Partial<VisitOptions>;

type TuseForm<TItem = Model> = (route: string, model: TItem, options?: UseFormOptions) => TMacrameForm<TItem>;
export declare function useForm<TItem = Model>(route: string | Ref<string>, model: TItem, options?: Macrame.UseFormOptions) : TMacrameForm<TItem>;

type TFormProps = Macrame.FormProps & {
    form: TMacrameForm<Model>
}
type TForm = FunctionalComponent<TFormProps>;
export const Form : TForm;

interface Index<TItem = any> {
    processing: boolean,
    perPage: number,
    items: TItem[],
    hasNextPage: boolean,
    hasPrevPage: boolean,
    currentPage: number,
    search: string,
    fromItem: number,
    toItem: number,
    totalItems: number,
    filters: any,
    reloadOnChange: (item: (WatchSource<unknown> | object)[]) => void,
    reload: () => void
    loadItems: () => void,
    addFilter: (filter: string) => void,
    removeFilter: (filter: string) => void,
    setPage: (page: number) => void
    nextPage: () => void,
    prevPage: () => void,
    lastPage: () => void,
    getLastPage: () => number,
    updateSearch: (e: string | object) => void,
    onUpdate: (cb: CallableFunction) => void,
    beforeUpdate: (cb: CallableFunction) => void,
}

type UseIndex<TItem = Model> = (props: Macrame.UseIndexProps) => Index<TItem>;

export declare function useIndex<TItem = Model>(props: Macrame.UseIndexProps): Index<TItem>;

export type TListItem<M = Model> = {
    children: TList<M>,
    value: M
}

export type TList<T = Model> = TListItem<T>[];

type UseList<TItem = Model> = (list?: TList<TItem>) => TList<TItem>;

export declare function useList<TItem = Model>(list?: TList<TItem>): TList<TItem>;

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
