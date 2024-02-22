import DOMModel from "./_components/Home/DOMModel/DOMModel";
import Headers from "./_components/Home/Headers/Headers";
import Images from "./_components/Home/Images/Images";
import Links from "./_components/Home/Links/Links";
import Speed from "./_components/Home/Speed/Speed";
import UrlInput from "./_components/Home/UrlInput/UrlInput";
import styles from "./page.module.scss";

const HomePage = () => {
  return (
    <main className={styles.home_main}>
      <UrlInput />
      <Headers />
      <div style={{ display: "flex" }}>
        <Images />
        <Speed />
      </div>
      <div style={{ display: "flex" }}>
        <DOMModel />
        <Links />
      </div>
    </main>
  );
}

export default HomePage;