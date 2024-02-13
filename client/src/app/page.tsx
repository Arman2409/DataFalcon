import UrlInput from "./_components/Home/UrlInput/UrlInput";
import styles from "./page.module.scss";

const HomePage = () => {
  return (
    <main className={styles.home_main}>
        <UrlInput />
    </main>
  );
}

export default HomePage;