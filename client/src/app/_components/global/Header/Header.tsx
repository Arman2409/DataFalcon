import styles from "./styles/Header.module.scss";

const Header = () => {
    return (
        <div className={styles.header_main}>
            <div className={styles.logo_cont}>
                <img
                    alt=""
                    src="/"
                    className={styles.logo}
                />
            </div>
            <div className={styles.user_data_cont}>
                
            </div>
        </div>
    )
}

export default Header;