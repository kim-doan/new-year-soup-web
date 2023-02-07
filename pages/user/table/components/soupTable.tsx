import soupImage from 'assets/img/soup01.png';
import Image from 'next/image';
import { useRecoilState } from 'recoil';

import { Soup } from 'app/apiClients/soupApi';
import styles from './soupTable.module.css';

interface SoupTableProps {
  soupList: Soup[];
}

const SoupTable = ({ soupList }: SoupTableProps) => {
  return (
    <>
      <div className={styles.tableWrapper}>
        <div className={styles.soupTable}>
          {soupList[0] && (
            <article className={styles.position_one}>
              <Image
                src={soupList[0].soupImgUrl ?? soupImage}
                alt="떡국1"
                width={70}
                height={100}
              />
              <span>{soupList[0].reqUserName ?? ''}</span>
            </article>
          )}
          {soupList[1] && (
            <article className={styles.position_two}>
              <Image
                src={soupList[1].soupImgUrl ?? soupImage}
                alt="떡국2"
                width={70}
                height={100}
              />
              <span>{soupList[1].reqUserName ?? ''}</span>
            </article>
          )}
          {soupList[2] && (
            <article className={styles.position_three}>
              <Image
                src={soupList[2].soupImgUrl ?? soupImage}
                alt="떡국3"
                width={70}
                height={100}
              />
              <span>{soupList[2].reqUserName ?? ''}</span>
            </article>
          )}
          {soupList[3] && (
            <article className={styles.position_four}>
              <Image
                src={soupList[3].soupImgUrl ?? soupImage}
                alt="떡국4"
                width={70}
                height={100}
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
