"use client"
import { useEffect } from "react";
import { useSelector } from "react-redux";

import DOMModel from "./components/DOMModel/DOMModel";
import Images from "./components/Images/Images";
import Links from "./components/Links/Links";
import Speed from "./components/Speed/Speed";
import styles from "./styles/DataView.module.scss";
import Title from "./components/Title/Title";
import Notification from "../../common/Notification/Notification";
import DataIconContainer from "./components/DataIconContainer/DataIconContainer";
import type { IRootState } from "../../../../store/store";

const DataView = () => {
    const { status, failMessage } = useSelector((state: IRootState) => state.extractedData);

    return (
        <div className={styles.data_view_main}>
            {status === "loaded" ? <>
                <div className={styles.data_sections}>
                    <Speed />
                    <Title />
                    <Images />
                </div>
                <div className={styles.data_sections}>
                    <DOMModel />
                    <Links />
                </div>
            </> : <DataIconContainer />}
            <Notification
                show={status === "failed"}
                type="error"
                message={failMessage}
            />
        </div>
    )
}

export default DataView;