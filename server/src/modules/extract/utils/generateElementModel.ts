const generateElementModel = (element: any) => {
    let { name, children, id, class: classname } = element;
    const domObject = {
        name,
        class: classname,
        id,
        children: children.length && children.map((element: any) => {
            return generateElementModel(element);
        })
    };
    return domObject;
}

export default generateElementModel;