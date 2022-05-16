import { 
    defineComponent, 
    ref, 
    watch, 
    PropType, 
    Component as VueComponent, 
    FunctionalComponent 
} from 'vue';
import Draggable from 'vuedraggable';
import { TSection, Model, DragOptions } from './../index';
const uuid = require('uuid').v4;

declare type TSections = {
    [k: string]: VueComponent | FunctionalComponent;
}[];

declare type DraggableSection = {
    uuid: string;
    component: any;
    key?: string;
    value?: Model;
};

const template = `
    <Draggable
        v-if="value"
        v-model="value"
        v-bind="dragOptions"
        :group="group"
        itemKey="uuid"
        :component-data="{
            name: !drag ? 'flip-list' : null,
            wrap: true,
        }"
        @start="drag = true"
        @end="drag = false"
    >
        <template #item="{ element }">
            <div>
                <component
                    :is="sections[getSectionKey(element.component)]"
                    :modelValue="element.value"
                    @update:modelValue="(e) => updateElement(element, e)"
                    @destroy="(e) => removeElement(element)"
                />
            </div>
        </template>
    </Draggable>
`;

const Sections = defineComponent({
    template,
    components: { Draggable },
    emits: ['update:modelValue'],
    props: { 
        modelValue: {
            type: Array as PropType<TSection[]>,
            required: true,
        },
        sections: {
            type: Object as PropType<TSections>,
            required: true,
        },
        group: {
            type: String,
            default: 'sections',
        },
        dragOptions: {
            type: Object as PropType<DragOptions>,
            default: () => ({
                animation: 200,
                ghostClass: 'ghost',
            }),
        },
    },
    setup(props, { emit }) {
        const drag = ref<boolean>(false);

        const updateElement = (element: any, value: any) => {
            element.value = value;
        };

        const getSectionKey = (section: any): string => {
            const json = JSON.stringify(section);
        
            for (let key in props.sections) {
                if (JSON.stringify(props.sections[key]) == json) {
                    return key;
                }
            }
        
            return '';
        };

        const removeElement = (element) => {
            value.value = value.value.filter((section) => {
                return section.uuid != element.uuid;
            });
        };

        const parseValue = (value: TSection[]) => {
            let b = [];
        
            for (let i in value) {
                b.push({
                    uuid: uuid(),
                    key: value[i].type,
                    value: value[i].value,
                    component: props.sections[value[i].type as any],
                });
            }
        
            return b;
        };

        const transformValue = (value: DraggableSection[]) => {
            let b: TSection[] = [];
        
            for (let i in value) {
                b.push({
                    type: getSectionKey(value[i].component),
                    value: value[i].value || {},
                });
            }
        
            return b;
        };

        const value = ref<DraggableSection[]>(parseValue(props.modelValue));

        watch(
            () => value,
            () => emit('update:modelValue', transformValue(value.value)),
            { deep: true }
        );

        return { drag, updateElement, removeElement, getSectionKey, value };
    }
});

export default Sections;