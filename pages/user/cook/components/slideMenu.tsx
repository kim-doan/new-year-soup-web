'use client';

import styles from './slideMenu.module.css';
import { TiArrowSortedUp, TiArrowSortedDown } from 'react-icons/ti';
import React, { useState } from 'react';
import BowlsMenu from './bowlsMenu';
import Button from 'pages/components/button/button';
import IngredientsMenu from './ingredientsMenu';

type MenuTypes = 'Bowl' | 'Ingredient';

interface SlideMenuProps {
  handleSoupUpload: () => void;
}

const SlideMenu = ({ handleSoupUpload }: SlideMenuProps) => {
  const [slideOpen, setSlideOpen] = useState(false);
  const [menuPage, setMenuPage] = useState<MenuTypes>('Bowl');

  const handleSlideToggle = () => {
    setSlideOpen(!slideOpen);
  };

  const handleMenuComponent = () => {
    switch (menuPage) {
      case 'Bowl':
        return <BowlsMenu />;
      case 'Ingredient':
        return <IngredientsMenu />;
      default:
        return null;
    }
  };

  const handleNextPage = () => {
    switch (menuPage) {
      case 'Bowl':
        setMenuPage('Ingredient');
        break;
      case 'Ingredient':
      default:
        return null;
    }
  };

  const handlePrevPage = () => {
    switch (menuPage) {
      case 'Ingredient':
        setMenuPage('Bowl');
        break;
      case 'Bowl':
      default:
        return null;
    }
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
      <section className={styles.menuWrapper}>
        {handleMenuComponent()}
        <div className={styles.buttonsWrapper}>
          <Button
            status="primary"
            disabled={menuPage === 'Bowl'}
            onClick={handlePrevPage}
          >
            이전으로
          </Button>
          {menuPage === 'Ingredient' ? (
            <Button status="main" onClick={handleSoupUpload}>
              메시지 작성하기
            </Button>
          ) : (
            <Button status="main" onClick={handleNextPage}>
              다음으로
            </Button>
          )}
        </div>
      </section>
    </div>
  );
};

export default SlideMenu;
