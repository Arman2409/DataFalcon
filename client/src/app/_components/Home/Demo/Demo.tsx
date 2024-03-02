"use client"
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { ThunkDispatch } from "@reduxjs/toolkit";

import styles from "./styles/Demo.module.scss";
import { changeContentDetails } from "../../../../store/slices/demoSlice";
import type { IRootState } from "../../../../store/store";

const Demo = () => {
    const { src, alt, title, description, text } = useSelector((state: IRootState) => state.demo);
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

    const close = useCallback(() => {
        dispatch(changeContentDetails({}))
    }, [dispatch, changeContentDetails]);

    return (
        <>
            {(src || title || text) && <div
                className={styles.main}
                onClick={close}>
                <img
                    onClick={close}
                    src={"./clear.png"}
                    className={styles.close_icon} />
                <div
                    className={styles.content}
                    onClick={(e) => e.stopPropagation()}>
                    {title ? <>
                        <h2 className={styles.title}>
                            {title}
                        </h2>
                        <h4 className={styles.description}>
                            {description}
                        </h4>
                    </> : null}
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
                </div>
            </div>}
        </>
    )
}

export default Demo;