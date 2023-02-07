import { FingerAction, SoupBowl } from 'core/states/cookState';
import Lottie from 'react-lottie';
import Image from 'next/image';
import { useRecoilState } from 'recoil';
import MagicAnimation from '../assets/lottie/Magic.json';
import SlideMenu from './components/slideMenu';
import styles from './cookPage.module.css';
import SoupDecorations from './components/soupDecorations';
import html2canvas from 'html2canvas';
import { v4 as uuidv4 } from 'uuid';
import { ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from 'common/lib/firebase/firebase';
import { useState } from 'react';

const lottieOptions = {
  loop: true,
  autoplay: true,
  animationData: MagicAnimation,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

const CookPage = () => {
  const [soupBowl] = useRecoilState(SoupBowl);
  const [fingerAction] = useRecoilState(FingerAction);
  const [isLoading, setIsLoading] = useState(false);

  const handleSoupUpload = () => {
    if (isLoading) return;

    setIsLoading(true);

    const soupDiv = document.getElementById('new-year-soup')!;
    html2canvas(soupDiv, {
      backgroundColor: null,
    }).then((canvas) => {
      const storageRef = ref(storage, `test/${uuidv4()}.png`);
      console.log(storageRef, canvas);
      const blobData = dataURItoBlob(canvas.toDataURL('image/png'));

      const uploadTask = uploadBytesResumable(storageRef, blobData);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          switch (snapshot.state) {
            case 'paused':
              console.log(console.log('Upload is paused'));
              break;
            case 'running':
              console.log('Upload is running');
              break;
          }
        },
        (error) => {
          alert('떡국 이미지 업로드에 실패했습니다.');
        },
        () => {
          // dispatch(trayAction.setSoupImgId(storageRef.name));
          // dispatch(soupAction.addSoupLoad());
        }
      );

      setIsLoading(false);
    });
  };

  const dataURItoBlob = (dataURI: string) => {
    // convert base64/URLEncoded data component to raw binary data held in a string
    let byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
      byteString = atob(dataURI.split(',')[1]);
    else byteString = unescape(dataURI.split(',')[1]);

    // separate out the mime component
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    const ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], { type: mimeString });
  };

  return (
    <section className={styles.page}>
      <div className={styles.soupTray}>
        <div
          className={`${styles.lottieWrapper} ${
            fingerAction ? styles.play : null
          }`}
        >
          <Lottie options={lottieOptions} width={120} height={120} />
        </div>
        <div id="new-year-soup" className={styles.soupWrapper}>
          <SoupDecorations />
          <Image src={soupBowl} alt="soupImage" width={240} />
        </div>
      </div>
      <SlideMenu handleSoupUpload={handleSoupUpload} />
    </section>
  );
};

export default CookPage;
