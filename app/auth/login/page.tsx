'use client';
import Image from 'next/image';
import titleLogo from '../../assets/img/titleLogo.png';
import { AuthService, authState } from 'app/core';
import { useRouter } from 'next/navigation';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import {
  FormIdError,
  FormPasswordError,
} from '../components/form/authFormError';
import styles from './login.module.css';
import Button from '../components/button/button';

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
  const [, setUser] = useRecoilState(authState);

  const { siginInUser } = new AuthService();

  const onSubmit: SubmitHandler<LoginForm> = async (data) => {
    const res = await siginInUser(data.id, data.password);
    setUser('Test');

    if (res?.user) {
      router.push('/');
    }
  };

  const onRouteCreateUser = () => {
    router.push('/auth/register');
  };

  return (
    <section>
      <div className={styles.imageWrapper}>
        <Image src={titleLogo} alt="title" className={styles.titleLogo} />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.inputWrapper}>
          <label>아이디</label>
          <input
            {...register('id', {
              required: true,
              minLength: 5,
              maxLength: 12,
              pattern: /^[a-zA-Z0-9]*$/,
            })}
            maxLength={12}
            autoFocus
          />
          <FormIdError fieldError={errors.id} />
        </div>

        <div className={styles.inputWrapper}>
          <label>비밀번호</label>
          <input
            {...register('password', { required: true, minLength: 8 })}
            type="password"
            maxLength={30}
          />
          <FormPasswordError fieldError={errors.password} />
        </div>

        <div className={styles.buttonWrapper}>
          <Button status="main" type="submit">
            떡국 만들러가기
          </Button>
          <Button status="primary" type="button" onClick={onRouteCreateUser}>
            회원가입 하러가기
          </Button>
        </div>
      </form>
    </section>
  );
};

export default Login;
