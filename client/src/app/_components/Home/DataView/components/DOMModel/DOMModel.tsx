"use client"
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { ThunkDispatch } from "@reduxjs/toolkit";

import styles from "./styles/DOMModel.module.scss";
import DOMElement from "./components/DOMElement/DOMElement";
import { changeOpenElements } from "../../../../../../store/slices/domModelSlice";
import type { StoreState } from "../../../../../../store/store";
import type { ElementModel } from "../../../../../../types/globals";
import type { OpenElement } from "../../../../../../store/slices/domModelSlice";

const DOMModel = () => {
    const [domItems, setDomItems] = useState<ElementModel[]>([]);
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const { domElements, status } = useSelector((state: StoreState) => state.extractData);
    const { openElements, showElement } = useSelector((state: StoreState) => state.domModel);

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
            return console.error(`Element with id ${id} not found.`);
        }

        const nestedCount = parseInt(targetElement.getAttribute('data-nested-count') as string, 10);
        let count = 0;
        const elements = Array.from(document.querySelectorAll('[data-nested-count]'));
        const targetIndex = elements.indexOf(targetElement);

        if (targetIndex === -1) {
            return console.error(`Element with id ${id} not found in the array of elements.`);
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
        setDomItems([...domElements])
    }, [domElements, setDomItems])

    useEffect(() => {
        setDomItems(curr => [...curr])
    }, [openElements, setDomItems])

    const openElementToShow = useCallback((parentIds: string[], targetId: string): any => {
        const openElementsRecursively = (
            parentIds: string[],
            current: number = 0,
            domItems: ElementModel[],
            openElements: OpenElement[]): undefined => {
            if (current === parentIds.length) {
                return;
            }
            const element = domItems.find(({ id }) => id === parentIds[current]);
            if (!element) {
                console.error("Element not found");
                return;
            }
            const { children, id: elemId } = { ...element };
            const childElementOrder = children ? children.findIndex(({ id }: ElementModel) => id === parentIds[current + 1]) + 1 : 0;
            if (childElementOrder) {
                return;
            }
            let newOpenElements = [];
            const isAlreadyOpen = openElements.find(({ id }: OpenElement) => id === elemId);
            if (isAlreadyOpen) {
                newOpenElements = openElements.map((openElement: OpenElement) => {
                    if (openElement.id === elemId) {
                        return {
                            id: openElement.id,
                            count: childElementOrder
                        }
                    }
                    return openElement;
                })
            } else {
                newOpenElements = [...openElements, {
                    id: elemId,
                    count: childElementOrder
                }]
            }
            dispatch(changeOpenElements(newOpenElements))
            openElementsRecursively(parentIds, current += 1, children || [], newOpenElements)
        }
        openElementsRecursively([...parentIds, targetId], 0, domItems, openElements)
    }, [dispatch, changeOpenElements, openElements, domItems])

    useEffect(() => {
        if (showElement) {
            const { parents, id }: any = { ...showElement };
            openElementToShow(parents, id);
        }
    }, [showElement, openElementToShow])

    return (
        <div className={styles.main}>
            {status === "loaded" ? <>
                <div className="section_title">
                    DOM Elements
                </div>
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
                ) : <h5 className="not_found_text">No DOM Elements found</h5>}
            </>
                : null}
        </div>
    )
}

export default DOMModel;