export type ElementModel = {
    id: string;
    type: string;
    name: string;
    classname?: string;
    idname?: string;
    class?: string;
    parents?: string[];
    children?: ElementModel[] | undefined;
    attribName?: string;
    rel?: string;
    data?: string;
    href?: string;
    src?: string;
    alt?: string;
    attribs?: any;
};
