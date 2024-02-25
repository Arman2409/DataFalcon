import styles from "./styles/Description.module.scss";

const Description = () => {
    return (
        <div className={styles.description_main}>
           <div className={styles.description_title}>
               Extract data from website by entering the url in  the input field behind
           </div>
        </div>
    )
}

export default Description;