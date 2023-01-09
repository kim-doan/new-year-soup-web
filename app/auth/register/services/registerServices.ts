import { createUserWithEmailAndPassword, type AuthError } from 'firebase/auth';
import { authService } from '../../../config/firebase';

export const createUser = async (id: string, pw: string) => {
  try {
    const convertEmail = id + '@newyearsoup.com';
    const res = await createUserWithEmailAndPassword(
      authService,
      convertEmail,
      pw
    );

    return res;
  } catch (e) {
    if (String(e).includes('auth/email-already-in-use')) {
      alert('이미 사용중인 아이디 입니다');
    }
  }
};
