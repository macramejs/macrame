export { addComponent, Component, use } from './components';
export { default as Checkbox } from './components/Checkbox';
export { default as FieldTitle } from './components/FieldTitle';
export { default as useForm, Form } from './components/Form';
export { default as FormCheckboxes } from './components/FormCheckboxes';
export { default as FormInput } from './components/FormInput';
export { default as FormSelect } from './components/FormSelect';
export { default as FormTextarea } from './components/FormTextarea';
export {
    default as createIndex,
    IndexSearch,
    IndexTable,
    IndexPagination,
} from './components/Index';
export { default as Select } from './components/Select';

import { use } from './components';
import { plugin } from './app';

use(plugin);
