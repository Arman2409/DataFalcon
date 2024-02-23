"use client"
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

import styles from "./styles/Speed.module.scss";
import type { IRootState } from "../../../../store/store";

const Speed = () => {
    const [speedNumber, setSpeedNumber] = useState<number>(0)
    const indicator = useRef<any>();
    const { speed } = useSelector((state: IRootState) => state.extractedData);

    useEffect(() => {
        if (speed) {
            indicator.current.style.animationPlayState = "running"
            const speedInterval = setInterval(() => {
                setSpeedNumber((curr: number) => {
                    if (curr === speed - 1) {
                        clearInterval(speedInterval);
                    }
                    return curr += 1;
                })
            }, 2)
        }
    }, [speed, setSpeedNumber])

    return (
        <div className={styles.main}>
            <div
                className={styles.indicator}>
                <div
                    ref={indicator}
                    className={styles.animating_cont} />
                <div
                    className={styles.indicator_content} >
                    {speedNumber}
                </div>
            </div>
        </div>
    )
}

export default Speed;