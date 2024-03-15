"use client"
import { useEffect, useState } from "react";

import styles from "./styles/Notification.module.scss";
import type { NotificationProps } from "../../../../types/props";

const Notification = ({
    message,
    type = "success",
    duration = 3,
    show = false,
    onFinish }
    : NotificationProps) => {
    const [visible, setVisible] = useState<boolean>();

    useEffect(() => {
        if (show) {
            setVisible(show);
            setTimeout(() => {
                setVisible(false);
                onFinish && onFinish();
            }, duration * 1000)
        }
    }, [show, duration, setVisible, onFinish])

    return (
        <>
            {visible && <div
                className={styles.notification_main}>
                <img
                    src={type === "error" ? "close.png" : "success.png"}
                    className={styles.notification_icon} />
                <p className={styles.notification_message}>
                    {message}
                </p>
            </div>}
        </>
    )
}

export default Notification;