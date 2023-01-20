import { SoupMessage } from 'app/core/states/soupState';
import Image from 'next/image';
import { useRecoilState } from 'recoil';
import soupImage from '../../../assets/img/soup01.png';

import styles from './soupTable.module.css';

interface SoupTableProps {
  items: string[];
}

const SoupTable = ({ items }: SoupTableProps) => {
  const [_, setSoupMessage] = useRecoilState(SoupMessage);

  const changeSoupMessage = (message: string) => {
    setSoupMessage(message);
  };

  return (
    <>
      <div className={styles.tableWrapper}>
        <div className={styles.soupTable}>
          {items[0] && (
            <article
              className={styles.position_one}
              onClick={() => {
                changeSoupMessage(items[0]);
              }}
            >
              <Image src={soupImage} alt="떡국" width={70} />
              <span>{items[0]}</span>
            </article>
          )}
          {items[1] && (
            <article
              className={styles.position_two}
              onClick={() => {
                changeSoupMessage(items[1]);
              }}
            >
              <Image src={soupImage} alt="떡국" width={70} />
              <span>{items[1]}</span>
            </article>
          )}
          {items[2] && (
            <article
              className={styles.position_three}
              onClick={() => {
                changeSoupMessage(items[2]);
              }}
            >
              <Image src={soupImage} alt="떡국" width={70} />
              <span>{items[2]}</span>
            </article>
          )}
          {items[3] && (
            <article
              className={styles.position_four}
              onClick={() => {
                changeSoupMessage(items[3]);
              }}
            >
              <Image src={soupImage} alt="떡국" width={70} />
              <span>{items[3]}</span>
            </article>
          )}
        </div>
      </div>
    </>
  );
};

export default SoupTable;
