import { defineComponent, onMounted, ref } from 'vue'
import Draggable from 'vuedraggable';
const uuid = require('uuid').v4;

const template = `
    <Draggable
        v-model="drawers"
        :group="{
            name: group,
            pull: 'clone',
            put: false,
        }"
        :sort="false"
        :clone="cloneSection"
    >
        <template #item="{ element }">
            <div>
                <component :is="element" />
            </div>
        </template>
    </Draggable>
`;

const Cabinet = defineComponent({
    template,
    components: { Draggable },
    props: { group: { type: String, default: 'sections'} },
    setup({}, { slots }) {
        const drawers = ref();

        onMounted(() => {
            if (slots.default) {
                drawers.value = slots.default();
            }
        });

        const cloneSection: any = (el: any) => ({
            uuid: uuid(),
            component: el.props.draws,
        });

        return { cloneSection, drawers };
    }
});

export default Cabinet;