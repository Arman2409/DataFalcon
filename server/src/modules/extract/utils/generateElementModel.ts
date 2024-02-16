const generateElementModel = (element: any) => {
    let { name = "", children = "" } = element;
    const domObject = {
        name,
        children: children.length && children.map((element: any) => {
            return generateElementModel(element);
        })
    };
    return domObject;
}

export default generateElementModel;