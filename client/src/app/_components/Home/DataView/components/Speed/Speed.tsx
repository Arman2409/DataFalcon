"use client"
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

import styles from "./styles/Speed.module.scss";
import configs from "../../../../../../configs/speed.json";
import type { StoreState } from "../../../../../../store/store";

const { speedChangeInterlval } = { ...configs };

const Speed = () => {
    const [speedNumber, setSpeedNumber] = useState<number>(0)
    const [animatingLeft, setAnimatingLeft] = useState<number>(200);
    const speedInterval = useRef<any>();
    const { speed } = useSelector((state: StoreState) => state.extractData);

    useEffect(() => {
        if (speed) {
            setSpeedNumber(0);
            setAnimatingLeft(200);
            if (speedInterval.current) clearInterval(speedInterval.current);
            speedInterval.current = setInterval(() => {
                setAnimatingLeft(prevValue => prevValue - 200 / speed );
                setSpeedNumber((curr: number) => {
                    if (curr === speed - 1) clearInterval(speedInterval.current);
                    return curr += 1;
                })
            }, speedChangeInterlval)
        }
    }, [speed, setSpeedNumber])

    return (
        <div className={styles.main}>
            {speed ? <div className="section_title">
                Speed
            </div> : null}
            <div
                className={styles.indicator}>
                    <div 
                      className={styles.animating_cont}
                      style={{
                        left: -animatingLeft  + "px",
                      }} 
                    />
                <div
                    className={styles.indicator_content} >
                    {speedNumber}
                   <p className={styles.indicator_ms}>ms</p>
                    
                </div>
            </div>
        </div>
    )
}

export default Speed;