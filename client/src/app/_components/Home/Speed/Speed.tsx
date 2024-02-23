"use client"
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

import styles from "./styles/Speed.module.scss";
import configs from "../../../../configs/speed.json";
import type { IRootState } from "../../../../store/store";

const { speedChangeInterlval } = { ...configs };

const Speed = () => {
    const [speedNumber, setSpeedNumber] = useState<number>(0)
    const indicatorAnimation = useRef<any>();
    const speedInterval = useRef<any>();
    const indicator = useRef<any>();
    const { speed } = useSelector((state: IRootState) => state.extractedData);

    useEffect(() => {
        if (speed) {
            setSpeedNumber(0);
            if (indicatorAnimation.current) {
                indicator.current.removeChild(indicatorAnimation.current);
            }
            indicatorAnimation.current = document.createElement("div");
            indicatorAnimation.current.setAttribute("class", styles.animating_cont);
            indicator.current.appendChild(indicatorAnimation.current);
            if (speedInterval.current) clearInterval(speedInterval.current);
            speedInterval.current = setInterval(() => {
                setSpeedNumber((curr: number) => {
                    if (curr === speed - 1) clearInterval(speedInterval.current);
                    return curr += 1;
                })
            }, speedChangeInterlval)
        }
    }, [speed, setSpeedNumber])

    return (
        <div className={styles.main}>
            <div className="section_title">
                Speed
            </div>
            <div
                ref={indicator}
                className={styles.indicator}>
                <div
                    className={styles.indicator_content} >
                    {speedNumber}
                </div>
            </div>
        </div>
    )
}

export default Speed;