import LeaderBoard from "./_components/pages/Home/LeaderBoard/LeaderBoard";
import Rooms from "./_components/pages/Home/Rooms/Rooms";
import styles from "./page.module.scss";

const HomePage = () => {
  return (
    <main className={styles.home_main}>
        <Rooms />
        <LeaderBoard />
    </main>
  );
}

export default HomePage;