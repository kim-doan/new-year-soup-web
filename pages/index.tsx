import Head from 'next/head';
import titleLogo from 'assets/img/titleLogo.png';
import Link from 'next/link';
import { useRecoilState } from 'recoil';
import Button from './components/button/button';
import { authState } from 'core/states/authState';
import styles from './page.module.css';
import Image from 'next/image';

const Home = () => {
  const [user] = useRecoilState(authState);

  return (
    <>
      <Head>
        <title>내 떡국을 끓여줘</title>
      </Head>
      <main>
        <section className={styles.page}>
          <div className={styles.background}>
            <div className={styles.imageWrapper}>
              <Image src={titleLogo} alt="title" className={styles.titleLogo} />
            </div>
            <div className={styles.buttonWrapper}>
              <Link href={'/user/table'}>
                <Button status="main">시작하기</Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;
