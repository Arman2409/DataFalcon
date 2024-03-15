import type { ElementModel } from "../../../../types/extract";
declare const getHead: ({ children }: ElementModel) => {
    title: string;
    description: string;
    iconLink: string;
};
export default getHead;
