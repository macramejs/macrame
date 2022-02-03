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

export type TFilter = {[k: string]: any}

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
    sortBy: {[k: string]: any},
    addSortBy: (key: string, direction?: string) => void,
    removeSortBy: (key: string) => void,
    isSortedBy: (key: string, direction?: string) => boolean,
    reloadOnChange: (item: (WatchSource<unknown> | object)[]) => void,
    reload: () => void
    loadItems: () => void,
    addFilter: (filter: TFilter) => void,
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

export type SaveJob = () => Promise<any>;

export type SaveQueue = {
    jobs: {
        [key: string]: {
            job: SaveJob,
            callback: () => void
        }[]
    },
    isDirty: boolean,
    add: (key: string, job: SaveJob, callback?: () => void) => void,
    remove: (key: string) => any,
    save: () => void,
};

type UseSaveQueue = () => SaveQueue;

export declare function useSaveQueue() : SaveQueue;

export type TList<M = Model> = {
    items: TListItem<M>[]
    push: (item: M, children?: RawListItem[]) => void,
    pop: () => M | void,
};

export type TListItem<M = Model> = {
    children: TList<M>,
    value: M
}

export type RawListItem<M = Model> = {
    children: RawListItem<M>[],
    value: M 
}

export type RawList<M = Model> = RawListItem<M>[];

type UseList<M = Model> = (list?: RawList<M>) => TList<M>;

export declare function useList<TItem = Model>(list?: RawList<TItem>): TList<TItem>;

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
