"use client"
import { useSelector } from "react-redux";

import styles from "./styles/Loading.module.scss";
import type { IRootState } from "../../../../store/store";

const Loading = () => {
    const { status } = useSelector((state: IRootState) => state.extractedData);

    return (
        <>
            {status === "loading" && <div className={styles.main}>
                <img
                    alt="Loading"
                    src="/falcon.gif"
                    className={styles.loading_image}
                />
            </div>}
        </>
    )
}

export default Loading;