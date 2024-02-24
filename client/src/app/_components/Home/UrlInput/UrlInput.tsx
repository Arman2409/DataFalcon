"use client"
import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";

import styles from "./styles/UrlInput.module.scss";
import { extract, changeLoadingState } from "../../../../store/slices/extractedDataSlice";
import configs from "../../../../configs/urlInput.json";

const { placeholderText, placeholderInterval } = { ...configs };

const UrlInput = () => {
    const [placeholder, setPlaceholder] = useState<string>("")
    const urlInput = useRef<any>();
    const inputInterval = useRef<any>();
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

    const extractData = useCallback(async (event: any) => {
        const { value = "" } = { ...document.activeElement as any }
        const clearCache = value === "clearCache" ? true : false;
        event.preventDefault();
        const url = event.target["0"]?.value;
        if (!url) return console.error("URL is empty");
        dispatch(changeLoadingState(true));
        dispatch(extract({url, clearCache}));
    }, [extract, dispatch])


    const clear = useCallback(() => {
        urlInput.current.value = "";
        setPlaceholder("");
    }, [setPlaceholder])

    const changeUrl = useCallback(({ target }: ChangeEvent<HTMLInputElement>) => {
        if (target.value === "") setPlaceholder("");
    }, [setPlaceholder])

    useEffect(() => {
        if (inputInterval.current) return;
        inputInterval.current = setInterval(() => {
            setPlaceholder((curr: string) => {
                if (curr.length === placeholderText.length - 1) {
                    return "";
                }
                return curr + placeholderText[curr.length];
            })
        }, placeholderInterval)
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
                    ref={urlInput}
                    className={styles.url_input}
                    onChange={changeUrl}
                />
                <img
                    src="/clear.png"
                    onClick={clear}
                    className={styles.clear_button}
                />
                <button
                    value="submit"
                    type="submit"
                    className={styles.submit_button}
                >
                    <p className={styles.submit_text}>
                        Submit
                    </p>
                </button>
                <div className={styles.retry_button_cont} >
                    <button
                        value="clearCache"
                        type="submit"
                        className={styles.retry_button}>
                        <img
                            src="/retry.png"
                            alt="Retry"
                            className={styles.retry_icon}
                        />
                        Clear cache and fetch again
                    </button>
                </div>
            </form>
        </div>
    )
}

export default UrlInput;