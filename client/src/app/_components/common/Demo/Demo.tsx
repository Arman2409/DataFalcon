"use client"
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { ThunkDispatch } from "@reduxjs/toolkit";

import styles from "./styles/Demo.module.scss";
import Notification from "../Notification/Notification";
import { changeContentDetails } from "../../../../store/slices/demoSlice";
import type { StoreState } from "../../../../store/store";

const Demo = () => {
    const { src, alt, title, description, text } = useSelector((state: StoreState) => state.demo);
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const [message, setMessage] = useState<string>("");

    const close = useCallback(() => {
        dispatch(changeContentDetails({}))
    }, [dispatch, changeContentDetails]);

    const copyText = useCallback((event: any) => {
        event.stopPropagation();
        if (!text) {
            return console.error("Text not provided for copying")
        }
        navigator.clipboard.writeText(text)
            .then(() => setMessage("Text copied to clipboard"))
            .catch(({ message }: Error) => {
                setMessage("Error copying text to clipboard:" + message);
            });
    }, [text, setMessage])

    return (
        <>
            {(src || title || text) && <div
                className={styles.main}
                onClick={close}>
                <Notification
                    show={Boolean(message)}
                    message={message}
                    onFinish={() => setMessage("")} />
                <img
                    onClick={close}
                    src={"./clear.png"}
                    className={styles.close_icon} />
                {text ? <img
                    onClick={(e) => copyText(e)}
                    src={"./copy.png"}
                    className={styles.copy_icon} /> : null}
                <div
                    className={styles.content}
                    onClick={(e) => e.stopPropagation()}>
                    {title ? <h2 className={styles.title}>
                        {title}
                    </h2> : null}
                    {description ? <h4 className={styles.description}>
                        {description}
                    </h4> : null}
                    {src ? <>
                        <img
                            src={src}
                            className={styles.demo_image}
                        />
                        <p className={styles.title}>
                            <a
                                target="_blank"
                                href={src}>
                                source - {src}
                            </a>
                        </p>
                        <p className={styles.description}>
                            {alt && `name - ${alt}`}
                        </p>
                    </> : null}
                    {text ? <p className={styles.text}>
                        {text}
                    </p> : null}
                </div>
            </div>}
        </>
    )
}

export default Demo;