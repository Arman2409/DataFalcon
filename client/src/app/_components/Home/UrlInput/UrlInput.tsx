"use client"
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";

import styles from "./styles/UrlInput.module.scss";
import { extract } from "../../../../store/slices/extractedDataSlice";

const UrlInput = () => {
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

    const extractData = useCallback(async (event: any) => {
        event.preventDefault();
        const url = event.target["0"].value;
        dispatch(extract(url));
    }, [])

    return (
        <div className={styles.url_input_main}>
            <form onSubmit={extractData}>
                <input
                    name="url"
                    type="url"
                    className={styles.url_input}
                />
                <button
                    type="submit"
                    className={styles.submit_button}
                >
                    Submit
                </button>
            </form>
        </div>
    )
}

export default UrlInput;