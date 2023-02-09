import Image from 'next/image';
import React from 'react';
import styles from './ingredientsMenu.module.css';

import {
  greenOnion,
  meat,
  pepper,
  egg,
  gimgaru,
  dumpling,
} from 'public/assets/ingredient';
import sideTray from '/public/assets/sideTray.png';
import { useRecoilState } from 'recoil';
import { FingerAction, SoupDecoration } from 'core/states/cookState';

const ingredientsList = [
  {
    id: 1,
    src: greenOnion,
  },
  {
    id: 2,
    src: meat,
  },
  {
    id: 3,
    src: pepper,
  },
  {
    id: 4,
    src: egg,
  },
  {
    id: 5,
    src: gimgaru,
  },
  {
    id: 6,
    src: dumpling,
  },
];

const IngredientsMenu = () => {
  const [soupDecoration, setSoupDecoration] = useRecoilState(SoupDecoration);
  const [fingerAction, setFingerAction] = useRecoilState(FingerAction);

  const handleIngredientChoice = (id: number) => {
    switch (id) {
      case 1:
        setSoupDecoration({
          ...soupDecoration,
          greenOnion: !soupDecoration.greenOnion,
        });
        if (!soupDecoration.greenOnion) {
          playLottieAction();
        }
        break;
      case 2:
        setSoupDecoration({ ...soupDecoration, meat: !soupDecoration.meat });
        if (!soupDecoration.meat) {
          playLottieAction();
        }
        break;
      case 3:
        setSoupDecoration({
          ...soupDecoration,
          pepper: !soupDecoration.pepper,
        });
        if (!soupDecoration.pepper) {
          playLottieAction();
        }
        break;
      case 4:
        setSoupDecoration({ ...soupDecoration, egg: !soupDecoration.egg });
        if (!soupDecoration.egg) {
          playLottieAction();
        }
        break;
      case 5:
        setSoupDecoration({
          ...soupDecoration,
          gimgaru: !soupDecoration.gimgaru,
        });
        if (!soupDecoration.gimgaru) {
          playLottieAction();
        }
        break;
      case 6:
        setSoupDecoration({
          ...soupDecoration,
          dumpling: !soupDecoration.dumpling,
        });
        if (!soupDecoration.dumpling) {
          playLottieAction();
        }
        break;
      default:
        break;
    }
  };

  const playLottieAction = () => {
    if (fingerAction) return;

    setFingerAction(true);
    setTimeout(setFingerAction, 800, false);
  };

  return (
    <div className={styles.menu}>
      {ingredientsList.map((ingredient) => {
        return (
          <div key={ingredient.id} className={styles.ingredientWrapper}>
            <Image className={styles.sideTray} src={sideTray} alt="sideTray" />
            <Image
              className={styles.ingredient}
              src={ingredient.src}
              alt="ingredientImage"
              width={80}
              onClick={() => {
                handleIngredientChoice(ingredient.id);
              }}
            />
          </div>
        );
      })}
    </div>
  );
};

export default IngredientsMenu;
