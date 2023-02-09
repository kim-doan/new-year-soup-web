'use client';
import { useQuery } from '@tanstack/react-query';
import { fbAuth } from 'common/lib/firebase/firebase';
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
import NextArrow from './components/nextArrow';
import PrevArrow from './components/prevArrow';
import SoupTable from './components/soupTable';
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
      alert('클립보드에 복사되었습니다. 친구들에게 링크를 공유해주세요.');
    });
  };

  const goToCookPage = () => {
    if (fbAuth.currentUser) {
      if (fbAuth.currentUser.uid === userId) {
        alert(
          '나 자신에게는 떡국을 남길 수 없어요. 친구에게 링크를 보내주세요.'
        );
      } else {
        router.push(`/user/cook/${userId}`);
      }
    } else {
      router.push(`/auth/login?redirect=${userId}`);
      alert('떡국을 전달하기 위해 로그인해주세요.');
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
    return <div>존재하지 않는 테이블입니다.</div>;
  }

  return (
    <>
      <div className={styles.titleWrapper}>
        <p>
          {user?.userName} 님에게
          <br />
          떡국 {soupList?.page?.totalElements} 그릇이 배달됐어요!!
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
            링크 복사하기
          </Button>
          <Button status="main" onClick={goToCookPage}>
            떡국 전해주기
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
              확인
            </Button>
          </div>
        )}
      </section>
    </>
  );
};

export default TablePage;
