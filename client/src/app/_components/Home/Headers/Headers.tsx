"use client"
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import styles from "./styles/Headers.module.scss";
import type { IRootState } from "../../../../store/store";

const Headers = () => {
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [logo, setLogo] = useState<string>("");

    // Get the current title and description from Redux store
    const { head } = useSelector((state: IRootState) => state.extractedData);

    useEffect(() => {
        const { title: currTitle = "", description: currDescription = "", logo: currLogo = "" } = { ...head };
        setTitle(currTitle);
        setDescription(currDescription);
        setLogo(currLogo);
    }, [head, setLogo, setTitle, setDescription])

    return (
        <div className={styles.main}>
            {title && <div className="section_title">
                Title and Description
            </div>}
            <h1 className={styles.title}>
                {title}
            </h1>
            <h4 className={styles.description}>
                {description}
            </h4>
        </div>
    )
}

export default Headers;