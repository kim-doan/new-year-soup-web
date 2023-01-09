'use client';
import { useRouter } from 'next/navigation';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import { authState } from '../../states';
import { FormIdError, FormPasswordError } from '../components/authFormError';
import styles from './login.module.css';
import { siginInUser } from './services/loginServices';

type LoginForm = {
  id: string;
  password: string;
};

const Login = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();
  const [_, setUser] = useRecoilState(authState);

  const onSubmit: SubmitHandler<LoginForm> = async (data) => {
    const res = await siginInUser(data.id, data.password);
    setUser('Test');

    if (res?.user) {
      router.push('/');
    }
  };

  return (
    <>
      <div>로그인</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.inputWrapper}>
          <input
            {...register('id', {
              required: true,
              minLength: 5,
              maxLength: 12,
              pattern: /^[a-zA-Z0-9]*$/,
            })}
            maxLength={12}
            autoFocus
            placeholder="아이디"
          />
          <FormIdError fieldError={errors.id} />
        </div>

        <div className={styles.inputWrapper}>
          <input
            {...register('password', { required: true, minLength: 8 })}
            type="password"
            maxLength={30}
            placeholder="비밀번호"
          />
          <FormPasswordError fieldError={errors.password} />
        </div>

        <input type="submit" />
      </form>
    </>
  );
};

export default Login;
