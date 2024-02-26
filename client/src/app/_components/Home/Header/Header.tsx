import styles from "./styles/Header.module.scss";

const Header = () => {
    return (
        <div className={styles.header_main}>
            <div className={styles.logo_cont}>
                <img
                    alt="Data Falcon"
                    src="/logo.png"
                    className={styles.logo}
                />
                <h1 className={styles.logo_title}>
                    Data Falcon
                </h1>
            </div>
        </div>
    )
}

export default Header;