"use client"
import { useSelector } from "react-redux";

import styles from "./styles/Loading.module.scss";
import type { IRootState } from "../../../../store/store";

const Loading = () => {
    const { loading } = useSelector((state: IRootState) => state.extractedData);

    return (
        <>
            {loading && <div className={styles.main}>
                <img
                    alt="Loading"
                    src="/loading.gif"
                    className={styles.loading_image}
                />
            </div>}
        </>
    )
}

export default Loading;