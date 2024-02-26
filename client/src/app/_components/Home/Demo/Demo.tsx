"use client"
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { ThunkDispatch } from "@reduxjs/toolkit";

import styles from "./styles/Demo.module.scss";
import { changeContentDetails } from "../../../../store/slices/demoSlice";
import type { IRootState } from "../../../../store/store";

const Demo = () => {
    const { src, alt } = useSelector((state: IRootState) => state.demo);
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

    const close = useCallback(() => {
        dispatch(changeContentDetails({ src: "" }))
    }, [dispatch, changeContentDetails]);

    return (
        <>
            {src ? <div
                className={styles.main}
                onClick={close}>
                <div
                    className={styles.content}
                    onClick={(e) => e.stopPropagation()}>
                    <img
                        onClick={close}
                        src={"./clear.png"}
                        className={styles.close_icon} />
                    <img
                        src={src}
                        className={styles.demo_image}
                    />
                    <p className={styles.src}>
                        <a
                            target="_blank"
                            href={src}>
                            source - {src}
                        </a>
                    </p>
                    <p className={styles.alt}>
                        {alt && `name - ${alt}`}
                    </p>
                </div>
            </div> : null}
        </>
    )
}

export default Demo;