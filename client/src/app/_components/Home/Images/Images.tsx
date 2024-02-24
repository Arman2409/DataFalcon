"use client"
import { useSelector } from "react-redux";

import styles from "./styles/Images.module.scss";
import Slide from "./components/Slide/Slide";
import type { IRootState } from "../../../../store/store";

const Images = () => {
    const { images } = useSelector((state: IRootState) => state.extractedData);

    return (
        <div
            className={styles.main}
        >
            <div className="section_title">
                Images
            </div>
            <div className={styles.slides_cont}>
                {images.length ? images.map(({ id, ...rest }: any) => (
                    <Slide key={id} {...rest} />
                )) : null}
            </div>
        </div>
    )
}

export default Images;