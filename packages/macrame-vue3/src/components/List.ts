import { h, defineComponent, PropType } from 'vue';
import Draggable from 'vuedraggable';
import {TList} from '../../index';

const template = `
    <Draggable tag="div" :list="list" handle=".handle">
        <template #item="{ element }">
            <slot :item="element" />
        </template>
    </Draggable>
`;

const List = defineComponent({
    template,
    components: { Draggable },
    props: {
        list: {
            required: true,
            type: Object as PropType<TList>,
        },
        draggable: {
            type: Boolean,
            required: false,
            default: true,
        }
    },
});

export default List;