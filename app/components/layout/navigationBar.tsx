'use client';
import Link from 'next/link';
import { useState } from 'react';
import { HiMenu } from 'react-icons/hi';
import { IoClose } from 'react-icons/io5';
import { TiHome } from 'react-icons/ti';
import { TbSoup } from 'react-icons/tb';
import { VscSignOut } from 'react-icons/vsc';
import styles from './navigationBar.module.css';

const NavigationBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavigation = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <div className={styles.navigationBar}>
        <button onClick={handleNavigation}>
          <HiMenu />
        </button>
      </div>
      <article
        className={`${styles.modalBackground} ${menuOpen && styles.on}`}
        onClick={handleNavigation}
      ></article>
      <nav className={`${styles.menu} ${menuOpen && styles.open}`}>
        <div className={styles.closeWrapper}>
          <button onClick={handleNavigation}>
            <IoClose />
          </button>
        </div>
        <ul>
          <li>
            <Link href="/">
              <div className={styles.iconWrapper}>
                <TiHome />
              </div>
              홈 화면으로 이동
            </Link>
          </li>
          <li>
            <Link href="/">
              <div className={styles.iconWrapper}>
                <TbSoup />
              </div>
              내 밥상 보러가기
            </Link>
          </li>
          <li>
            <Link href="/">
              <div className={styles.iconWrapper}>
                <VscSignOut />
              </div>
              로그아웃
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default NavigationBar;
