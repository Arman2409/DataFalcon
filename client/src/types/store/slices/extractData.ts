import type { ElementModel } from "../../../types/globals";

type Titles = {
   title?: string
   description?: string
   logo?: string
}

export type  ExtractParams = {
   clearCache?: boolean
   isDemo?: boolean
   url?: string
}

export interface ExtractInitialState {
   speed: number
   failMessage: string
   url: string
   status: "loading" | "failed" | "loaded" | "initial"
   domElements: ElementModel[]
   links: ElementModel[]
   titles: Titles
   images: ElementModel[]
}