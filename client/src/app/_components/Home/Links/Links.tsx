"use client"
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import styles from "./styles/Links.module.scss";
import type { IRootState } from "../../../../store/store";
import Link from "./components/Link/LInk";

const Links = () => {
    const [linksToShow, setLinksToShow] = useState<any[]>([]);
    const { links } = useSelector((state: IRootState) => state.extractedData);

    useEffect(() => {
        setLinksToShow(links);
    }, [links])

    return (
        <div className={styles.main}>
            {linksToShow.map((linkData:any) => (
                <Link 
                  {...linkData}
                />
            ))}
        </div>
    )
}

export default Links;