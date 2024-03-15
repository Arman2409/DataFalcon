import styles from "./styles/Footer.module.scss";
import configs from "../../../../configs/footer.json";

const { footerText } = { ...configs };

const Footer = () => (
    <div
        className={styles.footer_main}>
        <p
            className={styles.footer_text}>
            Copyright
        </p>
        <img
            src="./copyright.png"
            className={styles.copyright_image} />
        <p
            className={styles.footer_text}>
            {footerText}
        </p>
    </div>
)

export default Footer;