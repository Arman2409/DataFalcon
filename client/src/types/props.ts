export interface DomElementProps {
    name: string,
    children: any[]
    id: string
    type: string
    data: string
    nestedCount: number
    openElements: string[]
    idname: string
    classname: string
    handleClick: Function
}

export interface SlideProps {
    src: string
    alt: string
}

export interface LinkProps {
    href: string
    children: any[]
    id: string
    clickLink: Function
    parents: string[]
}
