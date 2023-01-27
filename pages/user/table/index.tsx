'use client';
import React, { useCallback, useEffect, useState } from 'react';
import LoadingSpinner from '../../components/loadingSpinner/loadingSpinner';
import SoupService from 'core/services/soupService';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './tablePage.module.css';
import NextArrow from './components/nextArrow';
import PrevArrow from './components/prevArrow';
import SoupTable from './components/soupTable';
import Link from 'next/link';
import Button from '../../components/button/button';
import { useRecoilState } from 'recoil';
import { SoupMessage } from 'core/states/soupState';

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
};

const TablePage = () => {
  const [list, setList] = useState<string[][]>();
  const [soupMessage, setSoupMessage] = useRecoilState(SoupMessage);

  const soupService = new SoupService();
  const isLoading = false;

  const afterChange = () => {};

  const division = useCallback(
    (items = ['a', 'b', 'c', 'd', 'e']) => {
      const newArray = [];

      for (let i = 0; i < items.length; i += 4) {
        newArray.push(items.slice(i, i + 4));
      }

      setList(newArray);
    },
    [setList]
  );

  const handleModalClose = () => {
    setSoupMessage('');
  };

  useEffect(() => {
    division();
  }, [division]);

  if (isLoading) {
    return (
      <div className={styles.spinnerWrapper}>
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <>
      <div className={styles.titleWrapper}>
        <p>
          테스트 님에게
          <br />
          떡국 1그릇이 배달됐어요!!
        </p>
      </div>
      <section className={styles.page}>
        <Slider {...settings} afterChange={afterChange}>
          {list?.map((i, index) => {
            return <SoupTable items={i} key={index} />;
          })}
        </Slider>
        <div className={styles.buttonsWrapper}>
          <Button status="main">링크 복사하기</Button>
          <Link href="/user/cook">
            <Button status="main">떡국 전해주기</Button>
          </Link>
        </div>
        {soupMessage && (
          <div className={styles.modalWrapper}>
            <div className={styles.background} onClick={handleModalClose}></div>
            <div className={styles.messageWrapper}>
              <textarea
                className={styles.text}
                value={soupMessage}
                readOnly={true}
                spellCheck={false}
              ></textarea>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default TablePage;
