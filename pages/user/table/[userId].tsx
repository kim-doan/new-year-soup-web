'use client';
import { useQuery } from '@tanstack/react-query';
import { fbAuth } from 'common/lib/firebase/firebase';
import PrevArrow from 'components/table/prevArrow';
import SoupTable from 'components/table/soupTable';
import { AuthService } from 'core';
import { PageRequestType } from 'core/constants/types';
import SoupService from 'core/services/soupService';
import { SoupContents } from 'core/states/cookState';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Slider from 'react-slick';
import { useRecoilState } from 'recoil';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import Button from '../../../components/button/button';
import LoadingSpinner from '../../../components/loadingSpinner/loadingSpinner';
import NextArrow from '../../../components/table/nextArrow';
import styles from './tablePage.module.css';

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
  const router = useRouter();
  const { userId } = router.query;
  const [pageable, setPageable] = useState<PageRequestType>({
    page: 0,
    size: 4,
  });
  const [contentsModal, setContentsModal] = useState(false);
  const [soupContents] = useRecoilState(SoupContents);

  const { getSoupList } = new SoupService();
  const { getUser } = new AuthService();

  const { data: user, isLoading } = useQuery(['getUser', userId], () =>
    userId ? getUser(userId as string) : null
  );

  const { data: soupList } = useQuery(
    ['getSoupList', userId, pageable.page, pageable.size],
    () =>
      userId
        ? getSoupList(userId as string, pageable.page, pageable.size)
        : null,
    {
      refetchOnWindowFocus: false,
      keepPreviousData: true,
    }
  );

  const handleAfterChange = (currentSlide: number) => {
    setPageable({ ...pageable, page: currentSlide });
  };

  const handleModalOpen = () => {
    setContentsModal(true);
  };

  const handleModalClose = () => {
    setContentsModal(false);
  };

  const copyToLink = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      alert('??????????????? ?????????????????????. ??????????????? ????????? ??????????????????.');
    });
  };

  const goToCookPage = () => {
    if (fbAuth.currentUser) {
      if (fbAuth.currentUser.uid === userId) {
        alert(
          '??? ??????????????? ????????? ?????? ??? ?????????. ???????????? ????????? ???????????????.'
        );
      } else {
        router.push(`/user/cook/${userId}`);
      }
    } else {
      router.push(`/auth/login?redirect=${userId}`);
      alert('????????? ???????????? ?????? ?????????????????????.');
    }
  };

  if (isLoading) {
    return (
      <div className={styles.spinnerWrapper}>
        <LoadingSpinner />
      </div>
    );
  }

  if (!userId) {
    return <div>???????????? ?????? ??????????????????.</div>;
  }

  return (
    <>
      <div className={styles.titleWrapper}>
        <p>
          {user?.userName} ?????????
          <br />
          ?????? {soupList?.page?.totalElements} ????????? ???????????????!!
        </p>
      </div>
      <section className={styles.page}>
        <Slider
          {...settings}
          afterChange={handleAfterChange}
          // beforeChange={handleBeforeChange}
        >
          {Array.from({ length: soupList?.page?.totalPage ?? 1 }).map(() => {
            return (
              <SoupTable
                userId={userId as string}
                soupList={soupList?.data ?? []}
                handleModalOpen={handleModalOpen}
                key={soupList?.page?.page?.toString() ?? '0'}
              />
            );
          })}
        </Slider>
        <div className={styles.buttonsWrapper}>
          <Button status="main" onClick={copyToLink}>
            ?????? ????????????
          </Button>
          <Button status="main" onClick={goToCookPage}>
            ?????? ????????????
          </Button>
        </div>

        {contentsModal && (
          <div className={styles.modalWrapper}>
            <div className={styles.background} onClick={handleModalClose}></div>
            <div className={styles.messageWrapper}>
              <textarea
                className={styles.text}
                value={soupContents}
                readOnly={true}
                spellCheck={false}
              ></textarea>
            </div>
            <Button status="primary" onClick={handleModalClose}>
              ??????
            </Button>
          </div>
        )}
      </section>
    </>
  );
};

export default TablePage;
