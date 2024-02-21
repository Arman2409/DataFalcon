"use client"
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import styles from "./styles/DOMModel.module.scss";
import DOMElement from "./components/DOMElement/DOMElement";
import type { IRootState } from "../../../../store/store";

const DOMModel = () => {
    const [openElements, setOpenElements] = useState<string[]>([])
    const [domItems, setDomItems] = useState<any>([]);
    const { domModel } = useSelector((state: IRootState) => state.extractedData);

    const clickElement = useCallback((id: string) => {
        if (openElements.includes(id)) {
            return setOpenElements(prevOpenElements => {
                const index = prevOpenElements.indexOf(id);
                return prevOpenElements.splice(index, 1);
            })
        }
        setOpenElements(prevOpenElements => [...prevOpenElements, id])
    }, [openElements, setOpenElements, domItems, setDomItems])

    useEffect(() => {
        const { head = null, body = null } = { ...domModel };
        if (head || body) setDomItems([head, body])
    }, [domModel, setDomItems])

    return (
        <div className={styles.main}>
            {domItems.length ? domItems.map(({id, ...rest}: any) =>  (
                    <DOMElement
                        key={id}
                        nestedCount={0}
                        openElements={openElements}
                        handleClick={clickElement}
                        {...rest}
                    />
                )
            ) : null}
        </div>
    )
}

export default DOMModel;