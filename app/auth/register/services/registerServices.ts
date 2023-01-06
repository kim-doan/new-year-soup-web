import { createUserWithEmailAndPassword } from 'firebase/auth';
import { authService } from '../../../config/firebase';

export const createUser = async (id: string, pw: string) => {
  const convertEmail = id + '@newyearsoup.com';
  const res = await createUserWithEmailAndPassword(
    authService,
    convertEmail,
    pw
  );

  return res;
};
