import { useCallback, useState } from "react";
import styles from "./styles/Slide.module.scss";
import type { SlideProps } from "../../../../../../types/props";

const Slide = ({
    src,
    alt
}: SlideProps) => {
    const [loaded, setLoaded] = useState<boolean>(false);

    const loadImage = useCallback((info: any) => {
        setLoaded(true);
    }, [setLoaded])

    return (
        <div
            className={styles.main}>
            {loaded ? <img
                src={src}
                onLoad={loadImage}
                className={styles.image}>
            </img> : alt}
        </div>
    )
}

export default Slide;