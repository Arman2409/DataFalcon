
import styles from "./styles/Link.module.scss";
import sliceString from "../../../../../../helpers/sliceString";
import type { LinkProps } from "../../../../../../types/props";

const Link = ({
    href,
    children,
    id,
    clickLink,
    parents }: LinkProps) => {
    const { data:name = ""} = children?.find(({type}) => type === "text") || {};
    
    return (
        <div
            onClick={() => clickLink(id, parents)}
            className={styles.main}
        >
            <h5 className={styles.name}>
                {sliceString(name, 20)}
            </h5>
            <a
                href={href}
                target="_blank"
                className={styles.link}>
                {sliceString(href, 50)}
            </a>
        </div>
    )
}

export default Link;