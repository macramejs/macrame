export const Form : TForm = function({ schema, form }) {
    let children = [];

    for(let i = 0;i<schema.length;i++) {
        let Child = resolveComponent(schema[i].name);

        children.push(h(Child, {
            ...schema[i].props,
            key:`f-${i}`,
            form
        }));
    }

    return h(`form`, {
        onSubmit: (e) => form.submit(e)
    }, children);
}