import { createUserWithEmailAndPassword } from 'firebase/auth';
import { AuthError } from '../../../common/lib/enums/authError';
import { authService } from '../../../common/lib/firebase/firebase';

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
    if (String(e).includes(AuthError.EMAIL_ALREADY_IN_USE)) {
      alert('이미 사용중인 아이디 입니다');
    }
  }
};
