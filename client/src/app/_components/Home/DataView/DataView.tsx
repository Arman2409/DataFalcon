"use client"
import { useSelector } from "react-redux";

import DOMModel from "./components/DOMModel/DOMModel";
import Images from "./components/Images/Images";
import Links from "./components/Links/Links";
import Speed from "./components/Speed/Speed";
import styles from "./styles/DataView.module.scss";
import Title from "./components/Title/Title";
import DataIconContainer from "./components/DataIconContainer/DataIconContainer";
import type { IRootState } from "../../../../store/store";

const DataView = () => {
    const { speed } = useSelector((state: IRootState) => state.extractedData);

    return (
        <div>
            {speed ? <>
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
        </div>
    )
}

export default DataView;