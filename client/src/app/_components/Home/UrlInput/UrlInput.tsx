"use client"
import { ChangeEvent, FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { ThunkDispatch } from "@reduxjs/toolkit";

import styles from "./styles/UrlInput.module.scss";
import { extract, changeLoadingState } from "../../../../store/slices/extractDataSlice";
import configs from "../../../../configs/urlInput.json";
import type { StoreState } from "../../../../store/store";

const { placeholderText, placeholderInterval } = { ...configs };

const UrlInput = () => {
    const [placeholder, setPlaceholder] = useState<string>("");
    const [inputUrl, setInputUrl] = useState<string>("");
    const urlInput = useRef<HTMLInputElement>(null);
    const inputInterval = useRef<any>();
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const { url } = useSelector((state: StoreState) => state.extractData);

    const extractData = useCallback(async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const { value = "" }: any = document.activeElement;
        const clearCache = value === "clearCache" ? true : false;
        if (!inputUrl) return console.error("URL is empty");
        dispatch(changeLoadingState("loading"));
        dispatch(extract({ url: inputUrl, clearCache }));
    }, [extract, inputUrl, dispatch, changeLoadingState])

    const clear = useCallback(() => {
        if (urlInput.current) urlInput.current.value = "";
        setPlaceholder("");
    }, [setPlaceholder])

    const changeUrl = useCallback(({ target }: ChangeEvent<HTMLInputElement>) => {
        const { value = "" } = { ...target || {} };
        if (value === "") setPlaceholder("");
        setInputUrl(value)
    }, [setPlaceholder, setInputUrl])

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

    useEffect(() => {
        if (url !== inputUrl) {
            setInputUrl(url);
        }
    }, [url, inputUrl, setInputUrl])

    return (
        <div className={styles.main}>
            <form
                onSubmit={extractData}
                className={styles.form}>
                <input
                    name="url"
                    type="url"
                    value={inputUrl}
                    min={8}
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