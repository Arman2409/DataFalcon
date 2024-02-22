
import styles from "./styles/Link.module.scss";

const Link = ({ href, children, id, clickLink, parents,...rest }: any) => {
    const name = children.find((child:any) => child?.type === "text")?.data || "";
    
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