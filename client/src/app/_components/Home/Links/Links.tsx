"use client"
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import styles from "./styles/Links.module.scss";
import type { IRootState } from "../../../../store/store";
import Link from "./components/Link/LInk";
import { changeOpenElements } from "../../../../store/slices/domModelSlice";

const Links = () => {
    const [linksToShow, setLinksToShow] = useState<any[]>([]);
    const { links } = useSelector((state: IRootState) => state.extractedData);
    const dispatch = useDispatch<any>();
    const { openElements } = useSelector((state: IRootState) => state.domModel);


    const clickLink = useCallback((id: string, parents: string[]) => {
        const newOpenElements = [...openElements, ...parents, id]
        dispatch(changeOpenElements(newOpenElements));
        setTimeout(() => {
            const element:any = document.getElementById(id); 
            const desiredPosition = element.offsetTop - 100;
            window.scrollTo({ 
                 top: desiredPosition,
                 behavior: 'smooth' 
                });
        }, 150)
    }, [changeOpenElements, openElements, dispatch, ])

    useEffect(() => {
        setLinksToShow(links);
    }, [links])

    return (
        <div className={styles.main}>
            {linksToShow.map((linkData: any) => (
                <Link
                    clickLink={clickLink}
                    {...linkData}
                />
            ))}
        </div>
    )
}

export default Links;