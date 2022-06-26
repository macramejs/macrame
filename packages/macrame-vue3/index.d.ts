import * as Macrame from '@macramejs/macrame'
import { 
    FunctionalComponent, 
    Plugin, 
    WatchSource, 
    Ref, 
    DefineComponent, 
    MultiWatchSources, 
    Component as VueComponent, 
    PropType, 
} from 'vue'
import { AxiosInstance, AxiosResponse } from 'axios';

type Data = Record<string, any|undefined>;
type Model = Record<string, any>;

export const plugin: Plugin;

type FormResource<
    M extends Model = Model, 
    T extends Model = Model
> = T & {
    data: M
}

type Form<
    M extends Model = Model,
    R extends FormResource = FormResource
> =  M & {
    errors: Record<keyof M, string>,
    isDirty: boolean,
    original: Original<M>,
    isBusy: boolean,
    isBusyLoading: boolean,
    data(): M,
    load(id: number|string): Promise<AxiosResponse<R>>,
    submit(e?: Event | any): Promise<AxiosResponse>,
};

type UseFormOptions<
    M extends Model = Model, 
    R extends FormResource = FormResource
> = {
    data: M,

    /**
     * Submit the form.
     */
    submit: (data: M, id?: number) => Promise<AxiosResponse>,

    /**
     * The function for initial loading the form attributes.
     */
    load?: (id: number|string) => Promise<AxiosResponse<R>>,

    /**
     * A function for transforming the data before submitting.
     */
    transform?: (data: M) => any,

    /**
     * 
     */
    onDirty?: (data: M) => void,
};

type UseForm<
    M extends Model = Model, 
    R extends FormResource = FormResource
> = (options: UseFormOptions<M, R>) => Form<M, R>;

export declare function useForm<
    M extends Model = Model, 
    R extends FormResource = FormResource
>(options: UseFormOptions<M, R>) : Form<M, R>;

interface Index<
    M = Model, 
    S extends string = string, 
    F extends IndexFilters = IndexFilters
> {
    /**
     * A list containting the items of the current page.
     */
    items: M[],

    /**
     * Determines whether new items are currently being loaded.
     */
    isBusy: boolean,

    /**
     * The number of items per page.
     */
    perPage: number,

    /**
     * Determines whether there is a next page.
     */
    hasNextPage: boolean,

    /**
     * Determines whether there is a previous page.
     */
    hasPrevPage: boolean,

    /**
     * The current page.
     */
    currentPage: number,

    /**
     * The last page.
     */
    lastPage: number,

    /**
     * The index of the first item.
     */
    fromItem: number,

    /**
     * The indeix of the last item.
     */
    toItem: number,

    /**
     * The total number of available items.
     */
    totalItems: number,

    /**
     * The search string.
     */
    search: Ref<string>,

    /**
     * The filters.
     */
    filters: F,

    /**
     * The current sortings.
     */
    sortBy: {[k in S]: "desc"|"asc" },

    // loading
    load(): void,
    reloadOnChange(item: any): void,

    // sorting
    addSortBy(key: S, direction?: "desc"|"asc"): void,
    removeSortBy: (key: S) => void,
    isSortedBy: (key: S, direction?: "desc"|"asc") => boolean,
    
    // paging
    setPage(page: number): void
    setNextPage(): void,
    setPrevPage(): void,
    setLastPage(): void,

    // filtering
    setFilter<T extends keyof F>(type: T, value: F[T]["value"]): void,
    removeFilter<T extends keyof F>(type: T): void

    // searching
    updateSearch(e: string | object): void,
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

type IndexFilter<
    V = any, 
    T extends Model & { transform?: (value: V) => any } = Model
> = T & { 
    /**
     * The value is required and will be send as a request parameter when 
     * reloading.
     * 
     * The get parameter for the 
     */
    value: V 
};

type IndexFilters = { 
    [k:string]: IndexFilter
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

interface UseIndexOptions<
    M, 
    S extends string = string, 
    F extends IndexFilters = IndexFilters
> {
    /**
     * The method for loading the items.
     */
    load: (params: IndexParams<S, F>) => Promise<AxiosResponse<IndexResource<M>>>,

    /**
     * The default sorting keys.
     */
    sortBy?: {[k in S]: "desc"|"asc" },

    /**
     * The filters that can be applied to the index.
     */
    filters?: F,
}
type UseIndex<
    M extends Model = Model, 
    S extends string = string, 
    F extends IndexFilters = IndexFilters
> = (options: UseIndexOptions<M, S, F>) => Index<M, S, F>;

/**
 * Creates a reactive index object that contains helpers to handles requests to 
 * index endpoints.
 * 
 * A basic example for an index of people could look like this:
 * 
 * ```js
 * const peopleIndex = useIndex({
 *     load: (params) => axios.get('pages', { params }),
 * });
 * 
 * peopleIndex.load();
 * 
 * peopleIndex.items.forEach(person => ...);
 * ``` 
 * 
 * The useIndex function accepts three generic arguments:
 * 1. `M` corresponds to the object of the index
 * 2. The keys that are sortable are given in `S` (e.g.: "id"|"title")
 * 2. `F` corresponds to the filters that can be applied to the index.
 */
export declare function useIndex<
    M extends Model = Model, 
    S extends string = string, 
    F extends IndexFilters = IndexFilters
>(options: UseIndexOptions<M, S, F>): Index<M, S, F>;

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

interface TreeResource<
    M extends Model = Model
> {
    data: RawTreeItem<M>[],
}

export type Tree<
    M extends Model = Model,
    R extends TreeResource<M> = TreeResource<M>
> = {
    items: TreeItem<M>[],
    load(): Promise<AxiosResponse<R>>,
    onOrderChange: (handler: (order: TreeOrder) => void) => void,
    push: (item: M, children?: RawTreeItem[]) => void,
    pop: () => M | void,
    setItems: (list: RawTree<M>) => void
    updateOnChange: (MultiWatchSources) => void
    getOrder: () => TreeOrder
};

export type TreeOrder = {
    id: number,
    children: TreeOrder[]
}[];

export type TreeItem<M extends Model = Model> = {
    children: Tree<M>,
    value: M
}

export type RawTreeItem<M extends Model = Model> = {
    children: RawTreeItem<M>[],
    value: M 
}

export type RawTree<M = Model> = RawTreeItem<M>[];

export type UseTreeOptions<
    M extends Model = Model,
    R extends TreeResource<M> = TreeResource<M>
> = {
    load?: () => Promise<AxiosResponse<R>>,
    items?: RawTree<M>,
}

type UseTree<
    M extends Model = Model,
    R extends TreeResource<M> = TreeResource<M>
> = (options?: UseTreeOptions<M, R>) => Tree<M>;

export declare function useTree<
    M extends Model = Model,
    R extends TreeResource<M> = TreeResource<M>
>(options?: UseTreeOptions<M, R>): Tree<M, R>;

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
