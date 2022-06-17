import * as Macrame from '@macramejs/macrame'
import { FunctionalComponent, Plugin, WatchSource, Ref, DefineComponent, MultiWatchSources, Component as VueComponent, PropType } from 'vue'
import { AxiosInstance, AxiosResponse } from 'axios';

type Data = Record<string, any|undefined>;
type Model = Record<string, any>;

export const plugin: Plugin;

type Form<M = Model> =  M & {
    errors: Record<keyof M, string>,
    isDirty: boolean,
    original: Original<M>,
    isBusy: boolean,
    isBusyLoading: boolean,
    data(): M,
    load(id: number|string): Promise<Form<M>>,
    submit(e?: Event | any): Promise<AxiosResponse>,
};

type UseFormOptions<M = Model> = {
    data: M,

    /**
     * 
     */
    submit: (data: M) => Promise<AxiosResponse>,

    /**
     * 
     */
    load?: (id: number|string) => Promise<M>,

    /**
     * 
     */
    transform?: (data: M) => any,

    /**
     * 
     */
    onDirty?: (form: Form<M>) => void,

    /**
     * 
     */
    onClean?: (form: Form<M>) => void,
};

type UseForm<M = Model> = (options: UseFormOptions<M>) => Form<M>;
export declare function useForm<M = Model>(options: UseFormOptions<M>) : Form<M>;

interface Index<M = any> {
    isBusy: boolean,
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
    load: () => void,
    setPage: (page: number) => void
    nextPage: () => void,
    prevPage: () => void,
    lastPage: () => void,
    getLastPage: () => number,
    updateSearch: (e: string | object) => void,
}

interface IndexResource<M> {
    data: M[],
    total: number,
    per_page: number,
    current_page: number,
    last_page: number,
    from: number,
    to: number
}

type IndexFilter<K extends string = string, V = any, T = {[k: string]: any}> = {
    [k in K]:  {value: V} & T
};

type IndexFilters = { 
    [k:string]: {
        [k: string]: any,
        value: any
    }
};



interface IndexParams<
    S extends string = string, 
    F extends IndexFilters = IndexFilters
> {
    search?: string,
    page?: number,
    perPage?: number,
    sortBy?: S[],
    filters?: F,
}

interface UseIndexProps<
    M, 
    S extends string = string, 
    F extends IndexFilters = IndexFilters
> {
    load: (params: IndexParams<S, F>) => Promise<AxiosResponse<IndexResource<M>>>,
    filters?: F
}

type UseIndex<M = Model> = (props: UseIndexProps<M>) => Index<M>;

export declare function useIndex<
    M = Model, 
    S extends string = string, 
    F extends IndexFilters = IndexFilters
>(props: UseIndexProps<M, S, F>): Index<M>;

export type Original<M = any> = {
    raw: M,
    stringified: string,
    update: (value: M) => void,
    matches: (value: M) => boolean
}

export type UseOriginal<M = any> = (value: M) => Original<M>;

export declare function useOriginal<M = any>(value: M) : Original<M>;

export type Translatable<M = string> = (locale: Ref<string>, values: {[k:string]: M}, onChange: (M) => void) => Ref<M>;

export declare function translatable<M = string>(locale: Ref<string>, values: {[k: string]: M}, onChange: (M) => void) : Ref<M>;

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
}[];

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
