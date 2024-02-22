"use client"
import { useSelector } from "react-redux";

import styles from "./styles/Images.module.scss";
import Slide from "./components/Slide/Slide";
import configs from "../../../../configs/images.json";
import type { IRootState } from "../../../../store/store";

const { contHeight } = { ...configs }

const Images = () => {
    const { images } = useSelector((state: IRootState) => state.extractedData);

    return (
        <div
            className={styles.main}
            style={{
                height: images.length ? contHeight + "px" : "0px",
            }} >
            <div className={styles.slides_cont}>
                {images.length ? images.map(({ id, ...rest }: any) => (
                    <Slide key={id} {...rest} />
                )) : null}
            </div>
        </div>
    )
}

export default Images;