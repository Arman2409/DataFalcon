
import styles from "./styles/Link.module.scss";
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
                {name}
            </h5>
            <a
                href={href}
                className={styles.link}>
                {href}
            </a>
        </div>
    )
}

export default Link;