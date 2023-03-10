/* eslint-disable @next/next/no-img-element */
import { FingerAction, SoupBowl } from 'core/states/cookState';
import Lottie from 'react-lottie';
import { useRecoilState } from 'recoil';
import MagicAnimation from 'public/assets/lottie/Magic.json';
import styles from './cookPage.module.css';
import html2canvas from 'html2canvas';
import { v4 as uuidv4 } from 'uuid';
import { ref, uploadBytesResumable } from 'firebase/storage';
import { fbAuth, storage } from 'common/lib/firebase/firebase';
import { useRef, useState } from 'react';
import { useRouter } from 'next/router';
import SoupService from 'core/services/soupService';
import Button from 'components/button/button';
import LoadingSpinner from 'components/loadingSpinner/loadingSpinner';
import SoupDecorations from 'components/cook/soupDecorations';
import SlideMenu from 'components/cook/slideMenu';

const lottieOptions = {
  loop: true,
  autoplay: true,
  animationData: MagicAnimation,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

const CookPage = () => {
  const router = useRouter();
  const { userId } = router.query;
  const [soupBowl] = useRecoilState(SoupBowl);
  const [fingerAction] = useRecoilState(FingerAction);
  const contentsRef = useRef<HTMLTextAreaElement>(null);
  const [contentsModal, setContentsModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { deliverySoup } = new SoupService();

  const handleSoupUpload = () => {
    if (isLoading) return;

    setIsLoading(true);

    const soupDiv = document.getElementById('new-year-soup')!;
    html2canvas(soupDiv, {
      backgroundColor: null,
    }).then((canvas) => {
      const storageRef = ref(storage, `${userId}/${uuidv4()}.png`);
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
          alert('?????? ????????? ???????????? ??????????????????.');
        },
        async () => {
          const res = await deliverySoup(
            userId as string,
            contentsRef.current?.value ?? '',
            storageRef.name
          );
          setIsLoading(false);
          if (res) {
            alert('????????? ????????? ???????????????.');

            router.push(`/user/table/${userId}`);
          }
        }
      );
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

  const handleModalState = () => {
    setContentsModal(!contentsModal);
  };

  return (
    <section className={styles.page}>
      {isLoading && (
        <div className={styles.spinnerWrapper}>
          <LoadingSpinner />
        </div>
      )}
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
          {/* NextImage ????????? html2canvas ????????? ?????? ?????? */}
          <img src={soupBowl.src} alt="soupImage" width={240} />
        </div>
      </div>
      {contentsModal && (
        <div className={styles.modalWrapper}>
          <div className={styles.background}></div>
          <div className={styles.messageWrapper}>
            <textarea
              ref={contentsRef}
              className={styles.text}
              spellCheck={false}
            ></textarea>
          </div>
          <div className={styles.buttonsWrapper}>
            <Button status="primary" onClick={handleModalState}>
              ??????
            </Button>
            <Button status="main" onClick={handleSoupUpload}>
              ????????????
            </Button>
          </div>
        </div>
      )}
      <SlideMenu handleModalState={handleModalState} />
    </section>
  );
};

export default CookPage;
