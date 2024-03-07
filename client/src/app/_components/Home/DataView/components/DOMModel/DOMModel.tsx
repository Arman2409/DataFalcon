"use client"
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { ThunkDispatch } from "@reduxjs/toolkit";

import styles from "./styles/DOMModel.module.scss";
import DOMElement from "./components/DOMElement/DOMElement";
import { changeOpenElements } from "../../../../../../store/slices/domModelSlice";
import type { IRootState } from "../../../../../../store/store";
import type { ElementModel } from "../../../../../../types/globals";
import type { OpenElement } from "../../../../../../store/slices/domModelSlice";

const DOMModel = () => {
    const [domItems, setDomItems] = useState<ElementModel[]>([]);
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const { domModel } = useSelector((state: IRootState) => state.extractedData);
    const { openElements } = useSelector((state: IRootState) => state.domModel);

    const clickElement = useCallback((id: string) => {
        if (!id) return console.error("Id not provided");
        if (openElements.find(({ id: elemId }: OpenElement) => elemId === id)) {
            const newArr = openElements.filter(({ id: elemID }: OpenElement) => elemID !== id);
            return dispatch(changeOpenElements(newArr));
        }
        dispatch(changeOpenElements([...openElements, { id, count: 10 }]));
    }, [openElements, dispatch, changeOpenElements])

    const calculateNestedCount = (id: string) => {
        const targetElement = document.getElementById(id);
        if (!targetElement) {
            console.error(`Element with id ${id} not found.`);
            return;
        }
    
        const nestedCount = parseInt(targetElement.getAttribute('data-nested-count') as string, 10);
        let count = 0;
        const elements = Array.from(document.querySelectorAll('[data-nested-count]'));
        const targetIndex = elements.indexOf(targetElement);
    
        if (targetIndex === -1) {
            console.error(`Element with id ${id} not found in the array of elements.`);
            return;
        }

        for (let i = targetIndex + 1; i < elements.length; i++) {
            const currentCount = parseInt(elements[i].getAttribute('data-nested-count') as string, 10);
                        
            if (currentCount > nestedCount) {
                count++;
            } else {
                break; // Stop counting when encountering an element with equal or lower data-nested-count
            }
        }  

        return count;
    }

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
                    calculateNestedCount={calculateNestedCount}
                    handleClick={clickElement}
                    {...rest}
                />
            )
            ) : null}
        </div>
    )
}

export default DOMModel;