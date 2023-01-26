import Image from 'next/image';
import { soupBowl1, soupBowl2 } from '../assets/soups';

import SlideMenu from './components/slideMenu';
import styles from './cookPage.module.css';

const CookPage = () => {
  return (
    <section className={styles.page}>
      <div className={styles.soupTray}>
        <Image src={soupBowl2} alt="a" width={240} />
      </div>
      <SlideMenu />
    </section>
  );
};

export default CookPage;
