"use client"
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { ThunkDispatch } from "@reduxjs/toolkit";

import styles from "./styles/Titles.module.scss";
import sliceString from "../../../../../../helpers/sliceString";
import { changeContentDetails } from "../../../../../../store/slices/demoSlice";
import type { StoreState } from "../../../../../../store/store";

const Titles = () => {
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [logo, setLogo] = useState<string>("");
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

    // Get the current title and description from Redux store
    const { titles, status } = useSelector((state: StoreState) => state.extractData);

    const clickHeaders = useCallback(() => {
        dispatch(changeContentDetails({ type: "title", title, description }))
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
            {status === "loaded" ? <>
                <div className="section_title">
                    Title and Description
                </div>
                {title ? <h1 className={styles.title}>
                    {title && sliceString(title, 75)}
                </h1> : null}
                {description ? <h4 className={styles.description}>
                    {description && sliceString(description, 50)}
                </h4> : null}
                {!title && !description && (
                    <h5 className="not_found_text">
                        No Titles found
                    </h5>
                )}
            </>
                : null}
        </div>
    )
}

export default Titles;