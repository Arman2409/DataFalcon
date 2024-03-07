import styles from "./styles/DataIconContainer.module.scss";

const DataIconContainer = () => (
    <div className={styles.data_icon_main}>
        <img
            src="/data.png"
            alt="Extracted data here"
            className={styles.data_icon} />
    </div>
)

export default DataIconContainer;