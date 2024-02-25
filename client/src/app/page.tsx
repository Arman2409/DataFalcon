import styles from "./_styles/page.module.scss";
import DOMModel from "./_components/Home/DOMModel/DOMModel";
import Headers from "./_components/Home/Headers/Headers";
import Images from "./_components/Home/Images/Images";
import Links from "./_components/Home/Links/Links";
import Loading from "./_components/Home/Loading/Loading";
import Speed from "./_components/Home/Speed/Speed";
import UrlInput from "./_components/Home/UrlInput/UrlInput";
import Description from "./_components/Home/Description/Description";

const HomePage = () => {
  return (
    <main className={styles.home_main}>
      <Description />
      <UrlInput />
      <Loading />
      <div className={styles.data_sections}>
        <Speed />
        <Headers />
        <Images />
      </div>
      <div className={styles.data_sections}>
        <DOMModel />
        <Links />
      </div>
    </main>
  );
}

export default HomePage;