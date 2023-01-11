import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  getAuth,
  Auth,
} from 'firebase/auth';
import { AuthError } from '../../common/lib/enums/authError';
import { authService } from '../../common/lib/firebase/firebase';

export default class AuthService {
  public siginInUser = async (id: string, pw: string) => {
    try {
      const convertEmail = id + '@newyearsoup.com';
      const res = await signInWithEmailAndPassword(
        authService,
        convertEmail,
        pw
      );

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

  public createUser = async (id: string, pw: string) => {
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
}