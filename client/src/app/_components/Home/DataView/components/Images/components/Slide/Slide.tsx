import { useCallback, useState } from "react";
import styles from "./styles/Slide.module.scss";
import type { SlideProps } from "../../../../../../../../types/props";

const Slide = ({
    src,
    alt,
    click
}: SlideProps) => {
    const [loaded, setLoaded] = useState<boolean>(false);

    const loadImage = useCallback(() =>{setLoaded(true)}, [setLoaded])

    return (
        <div
            onClick={() => click(src, alt)}
            className={styles.main}>
            <img
                src={src}
                onLoad={loadImage}
                style={{
                    display: loaded  ? "block" : "none",
                }}
                className={styles.image}>
            </img>
            {!loaded && alt}
        </div>
    )
}

export default Slide;