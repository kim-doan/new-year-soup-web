'use client';

import styles from './slideMenu.module.css';
import { TiArrowSortedUp, TiArrowSortedDown } from 'react-icons/ti';
import React, { useState } from 'react';

const SlideMenu = () => {
  const [slideOpen, setSlideOpen] = useState(false);

  const handleSlideToggle = () => {
    setSlideOpen(!slideOpen);
  };

  return (
    <div className={`${styles.slideWrapper} ${slideOpen && styles.open}`}>
      <button
        className={styles.slideToggle}
        type="button"
        onClick={handleSlideToggle}
      >
        {slideOpen ? <TiArrowSortedDown /> : <TiArrowSortedUp />}
        <div>떡국 메뉴 고르기</div>
      </button>
      <div className={styles.menuWrapper}>----아이템----</div>
    </div>
  );
};

export default SlideMenu;
