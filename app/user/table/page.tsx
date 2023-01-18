import LoadingSpinner from 'app/components/loadingSpinner/loadingSpinner';
import SoupService from 'app/core/services/soupService';
import styles from './soupTable.module.css';

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  // nextArrow: <NextArrow />,
  // prevArrow: <PrevArrow />,
};

const SoupTable = () => {
  const soupService = new SoupService();
  const isLoading = false;

  if (isLoading) {
    return (
      <div className={styles.spinnerWrapper}>
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <section className={styles.page}>
      <div className={styles.titleWrapper}>
        <p>
          테스트 님에게
          <br />
          떡국 1그릇이 배달됐어요!!
        </p>
      </div>
      <div className={styles.tableWrapper}>
        <div className={styles.soupTable}></div>
      </div>
    </section>
  );
};

// const NextArrow = (props) => {
//     const { className, style, onClick } = props;

//     return (
//         <div
//             className={className}
//             style={{ ...style, right: "50px", top: "140px" }}
//             onClick={onClick}
//         />
//     );
// }

// const PrevArrow = (props) => {
//     const { className, style, onClick } = props;
//     return (
//         <div
//             className={className}
//             style={{ ...style, left: "10px", zIndex: 1 }}
//             onClick={onClick}
//         />
//     );
// }

export default SoupTable;
