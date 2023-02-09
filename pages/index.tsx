import Head from 'next/head';
import titleLogo from 'assets/img/titleLogo.png';
import Link from 'next/link';
import Button from './components/button/button';
import styles from './page.module.css';
import Image from 'next/image';
import { fbAuth } from 'common/lib/firebase/firebase';
import { useState } from 'react';

const Home = () => {
  const [isLogin, setIsLogin] = useState(false);

  if (fbAuth) {
    fbAuth.onAuthStateChanged((user) => {
      if (user) {
        setIsLogin(true);
      } else {
        setIsLogin(false);
      }
    });
  }

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
              {isLogin ? (
                <Link href={`/user/table/${fbAuth.currentUser?.uid}`}>
                  <Button status="main">시작하기</Button>
                </Link>
              ) : (
                <Link href={`/auth/login`}>
                  <Button status="main">로그인</Button>
                </Link>
              )}
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;
