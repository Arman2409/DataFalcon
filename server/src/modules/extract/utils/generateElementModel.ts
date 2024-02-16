const generateElementModel = (element: any) => {
    let { name, children, id, class: classname, type } = element;
    if(!name) return null;
    const DOMELement = {
        name,
        class: classname,
        id,
        type,
        children: children && children.flatMap((element: any) => {
            return generateElementModel(element);
        })
    };
    return DOMELement;
}

export default generateElementModel;