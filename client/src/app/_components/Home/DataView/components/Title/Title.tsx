"use client"
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { ThunkDispatch } from "@reduxjs/toolkit";

import styles from "./styles/Headers.module.scss";
import sliceString from "../../../../../../helpers/sliceString";
import { changeContentDetails } from "../../../../../../store/slices/demoSlice";
import type { IRootState } from "../../../../../../store/store";

const Title = () => {
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [logo, setLogo] = useState<string>("");
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

    // Get the current title and description from Redux store
    const { titles } = useSelector((state: IRootState) => state.extractData);

    const clickHeaders = useCallback(() => {
        dispatch(changeContentDetails({type: "title", title, description }))
    }, [title, description])

    useEffect(() => {
        const { title: currTitle = "", description: currDescription = "", logo: currLogo = "" } = { ...titles };
        setTitle(currTitle);
        setDescription(currDescription);
        setLogo(currLogo);
    }, [titles, setLogo, setTitle, setDescription])

    return (
        <div 
         className={styles.main}
         onClick={clickHeaders}>
            {title && <div className="section_title">
                Title and Description
            </div>}
            <h1 className={styles.title}>
                {title && sliceString(title, 20)}
            </h1>
            <h4 className={styles.description}>
                {description && sliceString(description, 20)}
            </h4>
        </div>
    )
}

export default Title;