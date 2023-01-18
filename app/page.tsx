'use client';
import Link from 'next/link';
import { useRecoilState } from 'recoil';
import Button from './components/button/button';
import { authState } from './core/states/authState';
import styles from './page.module.css';

const Home = () => {
  const [user] = useRecoilState(authState);

  return (
    <section className={styles.page}>
      <div className={styles.background}></div>
      <div className={styles.buttonWrapper}>
        <Link href={'/auth/login'}>
          <Button status="main">시작하기</Button>
        </Link>
      </div>
    </section>
  );
};

export default Home;
