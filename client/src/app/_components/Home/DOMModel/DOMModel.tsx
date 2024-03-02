"use client"
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { ThunkDispatch } from "@reduxjs/toolkit";

import styles from "./styles/DOMModel.module.scss";
import DOMElement from "./components/DOMElement/DOMElement";
import { changeOpenElements } from "../../../../store/slices/domModelSlice";
import type { IRootState } from "../../../../store/store";
import type { ElementModel } from "../../../../types/globals";

const DOMModel = () => {
    const [domItems, setDomItems] = useState<ElementModel[]>([]);
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const { domModel } = useSelector((state: IRootState) => state.extractedData);
    const { openElements } = useSelector((state: IRootState) => state.domModel);

    const clickElement = useCallback((id: string) => {
        if(!id) return console.error("ID not provided");
        if (openElements.includes(id)) {
            const newArr = openElements.filter((elemID:string) => elemID !== id);
            return dispatch(changeOpenElements(newArr));
        }
        dispatch(changeOpenElements([...openElements, id]));
    }, [openElements, dispatch, changeOpenElements])

    useEffect(() => {
        const { head = null, body = null } = { ...domModel };
        if (head || body) setDomItems([head, body])
    }, [domModel, setDomItems])

    useEffect(() => {
        setDomItems(curr => [...curr])
    }, [setDomItems, openElements])

    return (
        <div className={styles.main}>
            {domItems.length ? <div className="section_title">
               DOM model
            </div> : null}
            {domItems.length ? domItems.map(({ id, ...rest }) => (
                <DOMElement
                    key={id}
                    id={id}
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