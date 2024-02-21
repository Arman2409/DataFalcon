
import styles from "./styles/Link.module.scss";

const Link = ({ href, children }: any) => {
    const name = children.find((child:any) => child?.type === "text")?.data || "";

    return (
        <div className={styles.main}>
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