"use client"
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";

import styles from "./styles/UrlInput.module.scss";
import { extract } from "../../../../store/slices/extractedDataSlice";

const placeholderText = "https:// ... "
const UrlInput = () => {
    const [placeholder, setPlaceholder] = useState<string>("")
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

    const extractData = useCallback(async (event: any) => {
        event.preventDefault();
        const url = event.target["0"]?.value;
        if (!url) return console.error("URL is empty");
        dispatch(extract(url));
    }, [extract, dispatch])

    useEffect(() => {
        setInterval(() => {
            setPlaceholder((curr: string) => {
                if (curr.length === placeholderText.length - 1) {
                    return "";
                }
                return curr + placeholderText[curr.length];
            })
        }, 1000)
    }, [setPlaceholder])

    return (
        <div className={styles.main}>
            <form 
             onSubmit={extractData}
             className={styles.form}>
                <input
                    name="url"
                    type="url"
                    placeholder={placeholder}
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