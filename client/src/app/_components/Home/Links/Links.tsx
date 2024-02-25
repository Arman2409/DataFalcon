"use client"
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { ThunkDispatch } from "@reduxjs/toolkit";

import styles from "./styles/Links.module.scss";
import Link from "./components/Link/LInk";
import { changeOpenElements } from "../../../../store/slices/domModelSlice";
import configs from "../../../../configs/links.json";
import type { IRootState } from "../../../../store/store";
import type { ElementModel } from "../../../../../../types/global";

const { waitBeforeScroll, scrollExtra } = { ...configs }

const Links = () => {
    const [linksToShow, setLinksToShow] = useState<ElementModel[]>([]);
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const { links } = useSelector((state: IRootState) => state.extractedData);
    const { openElements } = useSelector((state: IRootState) => state.domModel);

    const clickLink = useCallback((id: string, parents: string[]) => {
        const newOpenElements = [...openElements, ...parents, id]
        dispatch(changeOpenElements(newOpenElements));
        setTimeout(() => {
            const { offsetTop = 0} = document.getElementById(id) || {};
            const desiredPosition = offsetTop - scrollExtra;
            window.scrollTo({
                top: desiredPosition,
                behavior: 'smooth'
            });
        }, waitBeforeScroll + 50)
    }, [changeOpenElements, openElements, dispatch,])

    useEffect(() => {
        setLinksToShow(links);
    }, [links])

    return (
        <div className={styles.main}>
            {links.length ? <div className="section_title">
                Links
            </div> : null}
            {linksToShow.map(linkData => (
                <Link
                    clickLink={clickLink}
                    {...linkData}
                />
            ))}
        </div>
    )
}

export default Links;