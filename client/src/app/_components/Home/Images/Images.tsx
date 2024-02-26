"use client"
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { ThunkDispatch } from "@reduxjs/toolkit";

import styles from "./styles/Images.module.scss";
import Slide from "./components/Slide/Slide";
import { changeContentDetails } from "../../../../store/slices/demoSlice";
import type { IRootState } from "../../../../store/store";
import type { ElementModel } from "../../../../types/globals";

const Images = () => {
    const { images } = useSelector((state: IRootState) => state.extractedData);
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

    const clickImage = useCallback((src:string, alt:string) => { 
       dispatch(changeContentDetails({src, alt}))
    }, [changeContentDetails, dispatch])
    
    return (
        <div
            className={styles.main}
        >
            {images.length ? <div className="section_title" style={{
                alignSelf: "center"
            }}>
                Images
            </div> : null}
            <div className={styles.slides_cont}>
                {images.length ? images.map(({ id, ...rest }: ElementModel) => (
                    <Slide
                        key={id}
                        click={clickImage}
                        {...rest}
                    />
                )) : null}
            </div>
        </div>
    )
}

export default Images;