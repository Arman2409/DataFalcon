import DOMModel from "./_components/Home/DOMModel/DOMModel";
import UrlInput from "./_components/Home/UrlInput/UrlInput";
import styles from "./page.module.scss";

const HomePage = () => {
  return (
    <main className={styles.home_main}>
        <UrlInput />
        <DOMModel />
    </main>
  );
}

export default HomePage;