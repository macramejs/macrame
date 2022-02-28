import * as Macrame from '@macramejs/macrame'
import { FunctionalComponent, Plugin, WatchSource, Ref, DefineComponent, Component as VueComponent, PropType } from 'vue'
import { InertiaForm, VisitOptions, FormDataConvertible } from '@inertiajs/inertia-vue3';

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
export declare function useForm<TItem = Model>(route: string | Ref<string>, model: TItem, options?: UseFormOptions) : TMacrameForm<TItem>;

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

export type Original<M = any> = {
    raw: M,
    stringified: string,
    update: (value: M) => void,
    matches: (value: M) => boolean
}

export type UseOriginal<M = any> = (value: M) => Original<M>;

export declare function useOriginal<M = any>(value: M) : Original<M>;

export type Translatable<M = string> = {
    value: M,
    values: {[k: string]: M},
    locale: Ref<string>,
    setLocale: (locale: string) => void,
}

export type UseTranslatable<M = string> = (values: {[k:string]: M}, locale: Ref<string>) => Translatable<M>;

export declare function useTranslatable<M = string>(values: {[k: string]: M}, locale: Ref<string>) : Translatable<M>;

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

export type ListOrder = {
    id: number,
    children: ListOrder
}[] | FormDataConvertible;

export type TList<M = Model> = {
    items: TListItem<M>[],
    onOrderChange: (order: ListOrder) => void,
    push: (item: M, children?: RawListItem[]) => void,
    pop: () => M | void,
    setItems: (list: RawList<M>) => void
    updateOnChange: (list: RawList<M>) => void
    getOrder: () => ListOrder
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

export type UseListOptions = {
    onOrderChange?: (order: ListOrder) => void
}

type UseList<M = Model> = (list?: RawList<M>, options?: UseListOptions) => TList<M>;

export declare function useList<TItem = Model>(list?: RawList<TItem>, options?: UseListOptions): TList<TItem>;

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

// Cabinet / Sections

export declare interface TSection {
    type: string,
    value: Model
}

export declare type DragOptions = {
    animation?: number,
    ghostClass?: string,
}

export declare type CabinetProps = {
    group: {type: StringConstructor, default: string}
};

export const Cabinet : DefineComponent<CabinetProps>;

export declare type TSections = {
    [k: string]: VueComponent | FunctionalComponent;
}[];

declare type DraggableSection = {
    uuid: string;
    component: any;
    key?: string;
    value?: Model;
};

export declare type SectionsProps = {
    modelValue: {type: PropType<TSection[]>, required: true},
    sections: {type: PropType<TSections>, required: true},
    group: {type: StringConstructor, default: string},
    dragOptions: {
        type: PropType<DragOptions>, 
        default: () => {animation: number, ghostClass: string}
    },
};

export const Sections : DefineComponent<SectionsProps>;
