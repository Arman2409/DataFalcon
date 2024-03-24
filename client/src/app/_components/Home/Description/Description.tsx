"use client"
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import type { ThunkDispatch } from "@reduxjs/toolkit";

import styles from "./styles/Description.module.scss";
import { extract, changeLoadingState } from "../../../../store/slices/extractDataSlice";

const Description = () => {
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

    const showDemo = useCallback(() => {
        dispatch(changeLoadingState("loading"));
        dispatch(extract({ isDemo: true }))
    }, [dispatch, extract, changeLoadingState]);

    return (
        <div className={styles.description_main}>
            <div className={styles.description_title}>
                Extract data from website by entering the url in  the input field behind
            </div>
            <button 
              className={styles.demo_button}
              onClick={showDemo}>
                Request Demo
            </button>
        </div>
    )
}

export default Description;