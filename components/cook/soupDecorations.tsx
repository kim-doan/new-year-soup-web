/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { useRecoilState } from 'recoil';
import { SoupDecoration } from 'core/states/cookState';

import styles from './soupDecorations.module.css';
import {
  dumplingDeco,
  eggDeco,
  gimgaruDeco,
  greenOnionDeco,
  meatDeco,
  pepperDeco,
} from 'assets/user/assets/decorations';

const SoupDecorations = () => {
  const [soupDecoration] = useRecoilState(SoupDecoration);

  return (
    <>
      <div
        className={`${styles.dumpling} ${
          soupDecoration.dumpling ? styles.on : ''
        }`}
      >
        <img src={dumplingDeco.src} alt="dumpling" />
      </div>
      <div className={`${styles.egg} ${soupDecoration.egg ? styles.on : ''}`}>
        <img src={eggDeco.src} alt="egg" />
      </div>

      <div
        className={`${styles.gimgaru} ${
          soupDecoration.gimgaru ? styles.on : ''
        }`}
      >
        <img src={gimgaruDeco.src} alt="gimgaru" />
      </div>
      <div
        className={`${styles.greenOnion} ${
          soupDecoration.greenOnion ? styles.on : ''
        }`}
      >
        <img src={greenOnionDeco.src} alt="greenOnion" />
      </div>
      <div className={`${styles.meat} ${soupDecoration.meat ? styles.on : ''}`}>
        <img src={meatDeco.src} alt="meat" />
      </div>
      <div
        className={`${styles.pepper} ${soupDecoration.pepper ? styles.on : ''}`}
      >
        <img src={pepperDeco.src} alt="pepper" />
      </div>
    </>
  );
};

export default SoupDecorations;
