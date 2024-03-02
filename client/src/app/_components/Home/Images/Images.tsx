"use client"
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { ThunkDispatch } from "@reduxjs/toolkit";

import styles from "./styles/Images.module.scss";
import Slide from "./components/Slide/Slide";
import { changeContentDetails } from "../../../../store/slices/demoSlice";
import type { IRootState } from "../../../../store/store";
import type { ElementModel } from "../../../../types/globals";

const Images = () => {
    const [currentSlide, setCurrentSlide] = useState<number>(0);
    const { images, speed } = useSelector((state: IRootState) => state.extractedData);
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

    const clickImage = useCallback((src: string, alt: string) => {
        dispatch(changeContentDetails({ src, alt }))
    }, [changeContentDetails, dispatch])

    const updateSlide = useCallback((side: "left" | "right") => {
        if (side === "left") {
            setCurrentSlide(curr => {
                if (curr === 0) {
                    return images.length - 5;
                }
                return curr - 1
            })
        } else {
            setCurrentSlide(curr => {
                if (curr === images.length - 5) {
                    return 0;
                }
                return curr + 1
            }
            )
        }
    }, [setCurrentSlide, images])

    useEffect(() => {
        console.log(currentSlide);

    }, [currentSlide])

    return (
        <div
            className={styles.main}
        >
            {speed ? <><div
                className={`section_title ${styles.images_title}`} >
                Images
            </div>
                <img
                    src="./arrow.png"
                    className={styles.arrow_left}
                    onClick={() => updateSlide("left")}
                />
                <img
                    src="./arrow.png"
                    className={styles.arrow_right}
                    onClick={() => updateSlide("right")}
                /> </> : null}
            <div
                className={styles.slides_cont}
                style={{
                    left: -(currentSlide * 100) + "px",
                }}
            >
                {images.length ? images.map(({ id, ...rest }: ElementModel) => (
                    <Slide
                        key={id}
                        click={clickImage}
                        {...rest}
                    />
                )) : null}
            </div>
        </div >
    )
}

export default Images;