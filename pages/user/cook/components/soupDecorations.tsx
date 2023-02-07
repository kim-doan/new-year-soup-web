import React from 'react';
import Image from 'next/image';
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
} from '../../assets/decorations';

const SoupDecorations = () => {
  const [soupDecoration] = useRecoilState(SoupDecoration);

  return (
    <>
      <div
        className={`${styles.dumpling} ${
          soupDecoration.dumpling ? styles.on : ''
        }`}
      >
        <Image src={dumplingDeco} alt="dumpling" />
      </div>
      <div className={`${styles.egg} ${soupDecoration.egg ? styles.on : ''}`}>
        <Image src={eggDeco} alt="egg" />
      </div>

      <div
        className={`${styles.gimgaru} ${
          soupDecoration.gimgaru ? styles.on : ''
        }`}
      >
        <Image src={gimgaruDeco} alt="gimgaru" />
      </div>
      <div
        className={`${styles.greenOnion} ${
          soupDecoration.greenOnion ? styles.on : ''
        }`}
      >
        <Image src={greenOnionDeco} alt="greenOnion" />
      </div>
      <div className={`${styles.meat} ${soupDecoration.meat ? styles.on : ''}`}>
        <Image src={meatDeco} alt="meat" />
      </div>
      <div
        className={`${styles.pepper} ${soupDecoration.pepper ? styles.on : ''}`}
      >
        <Image src={pepperDeco} alt="pepper" />
      </div>
    </>
  );
};

export default SoupDecorations;
