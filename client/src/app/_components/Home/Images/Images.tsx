"use client"
import { useSelector } from "react-redux";

import styles from "./styles/Images.module.scss";
import Slide from "./components/Slide/Slide";
import type { IRootState } from "../../../../store/store";
import type { ElementModel } from "../../../../../../types/global";

const Images = () => {
    const { images } = useSelector((state: IRootState) => state.extractedData);

    return (
        <div
            className={styles.main}
        >
            {images.length ? <div className="section_title">
                Images
            </div> : null}
            <div className={styles.slides_cont}>
                {images.length ? images.map(({ id, src, ...rest }:ElementModel) => (
                    <Slide key={id} {...rest} />
                )) : null}
            </div>
        </div>
    )
}

export default Images;