import type { OpenElement } from "../store/slices/domModelSlice"
import type { ElementModel } from "../types/globals"

export interface DomElementProps extends ElementModel {
    nestedCount: number
    openElements: OpenElement[]
    handleClick: Function
}

export interface SlideProps {
    src?: string
    alt?: string
    click: Function
}

export interface LinkProps {
    id: string
    clickLink: Function
    parents?: string[]
    href?: string
    children?: ElementModel[]
}
