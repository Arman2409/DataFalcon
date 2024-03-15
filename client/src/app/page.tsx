import styles from "./_styles/page.module.scss";
import Loading from "./_components/common/Loading/Loading";
import UrlInput from "./_components/Home/UrlInput/UrlInput";
import Description from "./_components/Home/Description/Description";
import Demo from "./_components/common/Demo/Demo";
import DataView from "./_components/Home/DataView/DataView";
import Footer from "./_components/Home/Footer/Footer";

const HomePage = () => {
  return (
      <main className={styles.home_main}>
        <Demo />
        <Description />
        <UrlInput />
        <Loading />
        <DataView />
        <Footer />
      </main>
  );
}

export default HomePage;