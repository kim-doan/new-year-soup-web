import Image from 'next/image';
import React from 'react';
import styles from './bowlsMenu.module.css';

import { bowl1, bowl2, bowl3, bowl4, bowl5, bowl6 } from 'public/assets/bowls';
import {
  soupBowl1,
  soupBowl2,
  soupBowl3,
  soupBowl4,
  soupBowl5,
  soupBowl6,
} from 'public/assets/soups';

import { useRecoilState } from 'recoil';
import { SoupBowl } from 'core/states/cookState';

const bowlsList = [
  {
    id: 1,
    src: bowl1,
  },
  {
    id: 2,
    src: bowl2,
  },
  {
    id: 3,
    src: bowl3,
  },
  {
    id: 4,
    src: bowl4,
  },
  {
    id: 5,
    src: bowl5,
  },
  {
    id: 6,
    src: bowl6,
  },
];

const BowlsMenu = () => {
  const [_, setSoupBowl] = useRecoilState(SoupBowl);

  const handleBowlChoice = (id: number) => {
    switch (id) {
      case 1:
        setSoupBowl(soupBowl1);
        break;
      case 2:
        setSoupBowl(soupBowl2);
        break;
      case 3:
        setSoupBowl(soupBowl3);
        break;
      case 4:
        setSoupBowl(soupBowl4);
        break;
      case 5:
        setSoupBowl(soupBowl5);
        break;
      case 6:
        setSoupBowl(soupBowl6);
        break;
      default:
        break;
    }
  };

  return (
    <div className={styles.menu}>
      {bowlsList.map((bowl) => {
        return (
          <div key={bowl.id} className={styles.bowl}>
            <Image
              src={bowl.src}
              alt="bowlImage"
              onClick={() => {
                handleBowlChoice(bowl.id);
              }}
            />
          </div>
        );
      })}
    </div>
  );
};

export default BowlsMenu;
