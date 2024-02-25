import type { ElementModel } from "../types/globals"

export interface DomElementProps extends ElementModel {
    nestedCount: number
    openElements: string[]
    handleClick: Function
}

export interface SlideProps {
    src?: string
    alt?: string
}

export interface LinkProps {
    id: string
    clickLink: Function
    parents?: string[]
    href?: string
    children?: ElementModel[]
}
