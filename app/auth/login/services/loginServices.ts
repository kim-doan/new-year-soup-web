import { signInWithEmailAndPassword } from 'firebase/auth';
import { AuthError } from '../../../common/lib/enums/authError';
import { authService } from '../../../common/lib/firebase/firebase';

export const siginInUser = async (id: string, pw: string) => {
  try {
    const convertEmail = id + '@newyearsoup.com';
    const res = await signInWithEmailAndPassword(authService, convertEmail, pw);

    return res;
  } catch (e) {
    const authError = String(e);

    if (
      authError.includes(AuthError.WORONG_PASSWORD) ||
      authError.includes(AuthError.USER_NOT_FOUND)
    ) {
      alert('아이디 혹은 비밀번호를 확인해주세요');
    } else if (authError.includes(AuthError.MANY_REQUESTS)) {
      alert('요청이 많습니다, 잠시 후 다시 시도해주세요');
    }
  }
};
