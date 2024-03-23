"use client"
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { ThunkDispatch } from "@reduxjs/toolkit";

import styles from "./styles/Links.module.scss";
import Link from "./components/Link/LInk";
import { changeOpenElements, changeShowElement } from "../../../../../../store/slices/domModelSlice";
import configs from "../../../../../../configs/links.json";
import type { IRootState } from "../../../../../../store/store";
import type { ElementModel } from "../../../../../../types/globals";

const { waitBeforeScroll, scrollExtra } = { ...configs }

const Links = () => {
    const [linksToShow, setLinksToShow] = useState<ElementModel[]>([]);
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const { links, status } = useSelector((state: IRootState) => state.extractData);
    const { openElements } = useSelector((state: IRootState) => state.domModel);

    const clickLink = useCallback((id: string, parents: string[]) => {
        dispatch(changeShowElement({ id, parents }));
        setTimeout(() => {
            const { offsetTop = 0 } = document.getElementById(id) || {};
            const desiredPosition = offsetTop - scrollExtra;

            window.scrollTo({
                top: desiredPosition,
                behavior: 'smooth'
            });
        }, waitBeforeScroll + 50)
    }, [changeOpenElements, openElements, dispatch,])

    const changeShowCount = useCallback((type: "more" | "less") => {
        setLinksToShow(links.slice(0, linksToShow.length +( type === "more" ? 10 : -10)));
    }, [links, linksToShow, setLinksToShow])

    useEffect(() => {
        setLinksToShow(links.slice(0, 10));
    }, [setLinksToShow, openElements, links])

    return (
        <div className={styles.main}>
            {status === "loaded" ? <><div className="section_title">
                Links
            </div>
                {linksToShow.map(linkData => (
                    <Link
                        key={linkData.id}
                        clickLink={clickLink}
                        {...linkData}
                    />
                ))}
                {links.length > linksToShow.length ?
                    <div className="actions_cont">
                        <p className="show_more" onClick={() => changeShowCount("more")}>
                            Show More
                        </p>
                        <p className="show_less" onClick={() => changeShowCount("less")}>
                            Show Less
                        </p>
                    </div> : null}
            </>
                : null}
        </div>
    )
}

export default Links;