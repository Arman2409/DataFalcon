import styles from "./_styles/page.module.scss";
import Loading from "./_components/Home/Loading/Loading";
import UrlInput from "./_components/Home/UrlInput/UrlInput";
import Description from "./_components/Home/Description/Description";
import Demo from "./_components/Home/Demo/Demo";
import DataView from "./_components/Home/DataView/DataView";

const HomePage = () => {
  return (
      <main className={styles.home_main}>
        <Demo />
        <Description />
        <UrlInput />
        <Loading />
        <DataView />
      </main>
  );
}

export default HomePage;