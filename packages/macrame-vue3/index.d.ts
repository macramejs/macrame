import * as Macrame from '@macramejs/macrame'
import { FunctionalComponent, Plugin, WatchSource, Ref, DefineComponent, MultiWatchSources, Component as VueComponent, PropType } from 'vue'
import { InertiaForm, VisitOptions, FormDataConvertible } from '@inertiajs/inertia-vue3';

type Data = Record<string, any|undefined>;
type Model = Record<string, any>;

export const plugin: Plugin;

type Form<M = Model> =  {
    submit(e?: Event | any): void,
    get: undefined,
    post: undefined,
    put: undefined,
    patch: undefined,
    delete: undefined,
} & InertiaForm<Model>

type UseFormOptions<M = Model> = Macrame.UseFormOptions | Partial<VisitOptions> | {
    onDirty?: (form: Form<M>) => void,
    onClean?: (form: Form<M>) => void,
};

type UseForm<M = Model> = (options: UseFormOptions<M>) => Form<M>;
export declare function useForm<M = Model>(options: UseFormOptions<M>) : Form<M>;

export type IndexFilter = {[k: string]: any}

interface Index<M = any> {
    processing: boolean,
    perPage: number,
    items: M[],
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
    addFilter: (filter: IndexFilter) => void,
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

type UseIndex<M = Model> = (props: Macrame.UseIndexProps) => Index<M>;

export declare function useIndex<M = Model>(props: Macrame.UseIndexProps): Index<M>;

export type Original<M = any> = {
    raw: M,
    stringified: string,
    update: (value: M) => void,
    matches: (value: M) => boolean
}

export type UseOriginal<M = any> = (value: M) => Original<M>;

export declare function useOriginal<M = any>(value: M) : Original<M>;

export type TranslatableReactive<M = string> = {
    value: M,
    values: {[k: string]: M},
    locale: Ref<string>,
    setLocale: (locale: string) => void,
}

export type Translatable<M = string> = (values: {[k:string]: M}, locale: Ref<string>) => TranslatableReactive<M>;

export declare function translatable<M = string>(values: {[k: string]: M}, locale: Ref<string>) : TranslatableReactive<M>;

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

export type Tree<M = Model> = {
    items: TreeItem<M>[],
    onOrderChange: (order: ListOrder) => void,
    push: (item: M, children?: RawTreeItem[]) => void,
    pop: () => M | void,
    setItems: (list: RawTree<M>) => void
    updateOnChange: (MultiWatchSources) => void
    getOrder: () => ListOrder
};

export type TreeItem<M = Model> = {
    children: Tree<M>,
    value: M
}

export type RawTreeItem<M = Model> = {
    children: RawTreeItem<M>[],
    value: M 
}

export type RawTree<M = Model> = RawTreeItem<M>[];

export type UseTreeOptions = {
    onOrderChange?: (order: ListOrder) => void
}

type UseTree<M = Model> = (list?: RawTree<M>, options?: UseTreeOptions) => Tree<M>;

export declare function useTree<TItem = Model>(list?: RawTree<TItem>, options?: UseTreeOptions): Tree<TItem>;

type TInput = FunctionalComponent<Data>;
export const Input : TInput;

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
