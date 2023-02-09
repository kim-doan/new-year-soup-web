import { Soup } from 'apiClients/soupApi';
import soupImage from 'assets/img/soup01.png';
import { fbAuth } from 'common/lib/firebase/firebase';
import SoupService from 'core/services/soupService';
import { SoupContents } from 'core/states/cookState';
import Image from 'next/image';
import { useRecoilState } from 'recoil';

import styles from './soupTable.module.css';

interface SoupTableProps {
  userId: string;
  soupList: Soup[];
  handleModalOpen: () => void;
}

const SoupTable = ({ userId, soupList, handleModalOpen }: SoupTableProps) => {
  const { getSoupDetail } = new SoupService();
  const [_, setSoupContents] = useRecoilState(SoupContents);

  const handleSoupDetail = async (soupNo: number) => {
    if (fbAuth?.currentUser?.uid === userId) {
      const res = await getSoupDetail(soupNo);
      setSoupContents(res?.soupContents ?? '');

      handleModalOpen();
    } else {
      alert('떡국의 주인만 확인할 수 있습니다');
    }
  };

  return (
    <>
      <div className={styles.tableWrapper}>
        <div className={styles.soupTable}>
          {soupList[0] && (
            <article className={styles.position_one}>
              <Image
                src={soupList[0].soupImgUrl ?? soupImage}
                alt="떡국1"
                width={90}
                height={100}
                onClick={() => {
                  handleSoupDetail(soupList[0]?.soupNo!);
                }}
              />
              <span>{soupList[0].reqUserName ?? ''}</span>
            </article>
          )}
          {soupList[1] && (
            <article className={styles.position_two}>
              <Image
                src={soupList[1].soupImgUrl ?? soupImage}
                alt="떡국2"
                width={90}
                height={100}
                onClick={() => {
                  handleSoupDetail(soupList[1]?.soupNo!);
                }}
              />
              <span>{soupList[1].reqUserName ?? ''}</span>
            </article>
          )}
          {soupList[2] && (
            <article className={styles.position_three}>
              <Image
                src={soupList[2].soupImgUrl ?? soupImage}
                alt="떡국3"
                width={90}
                height={100}
                onClick={() => {
                  handleSoupDetail(soupList[2]?.soupNo!);
                }}
              />
              <span>{soupList[2].reqUserName ?? ''}</span>
            </article>
          )}
          {soupList[3] && (
            <article className={styles.position_four}>
              <Image
                src={soupList[3].soupImgUrl ?? soupImage}
                alt="떡국4"
                width={90}
                height={100}
                onClick={() => {
                  handleSoupDetail(soupList[3]?.soupNo!);
                }}
              />
              <span>{soupList[3].reqUserName ?? ''}</span>
            </article>
          )}
        </div>
      </div>
    </>
  );
};

export default SoupTable;
