"use client"
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import styles from "./styles/Links.module.scss";
import Link from "./components/Link/LInk";
import { changeOpenElements } from "../../../../store/slices/domModelSlice";
import configs from "../../../../configs/links.json";
import type { IRootState } from "../../../../store/store";

const { waitBeforeScroll, scrollExtra} = {...configs}

const Links = () => {
    const [linksToShow, setLinksToShow] = useState<any[]>([]);
    const dispatch = useDispatch<any>();
    const { links } = useSelector((state: IRootState) => state.extractedData);
    const { openElements } = useSelector((state: IRootState) => state.domModel);

    const clickLink = useCallback((id: string, parents: string[]) => {
        const newOpenElements = [...openElements, ...parents, id]
        dispatch(changeOpenElements(newOpenElements));
        setTimeout(() => {
            const element:any = document.getElementById(id); 
            const desiredPosition = element.offsetTop - scrollExtra;
            window.scrollTo({ 
                 top: desiredPosition,
                 behavior: 'smooth' 
                });
        }, waitBeforeScroll + 50)
    }, [changeOpenElements, openElements, dispatch, ])

    useEffect(() => {
        setLinksToShow(links);
    }, [links])

    return (
        <div className={styles.main}>
            <div className="section_title">
                Links
            </div>
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