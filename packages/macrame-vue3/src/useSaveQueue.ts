import { reactive, watch } from "vue"

const useSaveQueue = function() {
    const saveQueue = reactive({
        jobs: {},
        isDirty: false,
        add(key, job, callback = () => null) {
            this.jobs[key] = { job, callback };
        },
        remove(key) {
            delete this.jobs[key];  
        },
        async save() {
            let promises = [];
            
            for(let key in this.jobs) {
                let func = async () => {
                    await this.jobs[key].job();
                    this.jobs[key].callback();
                }
                promises.push(func());
            }

            this.jobs = {};

            await Promise.all(promises.map(p => p.catch(e => e)))
        },
    });

    watch(
        saveQueue,
        () => {
            saveQueue.isDirty = Object.keys(saveQueue.jobs).length > 0;
        },
        {
            // force eager callback execution
            immediate: true
        }
    );

    return saveQueue;
}

export default useSaveQueue;