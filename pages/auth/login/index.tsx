'use client';
import Image from 'next/image';
import titleLogo from 'assets/img/titleLogo.png';
import { AuthService } from 'core';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  FormIdError,
  FormPasswordError,
} from '../../../components/form/authFormError';
import styles from './login.module.css';
import Button from '../../../components/button/button';
import Head from 'next/head';
import { NextRouter, withRouter } from 'next/router';

type LoginForm = {
  id: string;
  password: string;
};

interface LoginProps {
  router: NextRouter;
}

const Login = ({ router }: LoginProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();

  const { siginInUser } = new AuthService();

  const onSubmit: SubmitHandler<LoginForm> = async (data) => {
    const res = await siginInUser(data.id, data.password);

    if (res?.user) {
      if (router.query.redirect) {
        router.push(`/user/table/${router.query.redirect}`);
      } else {
        router.push('/');
      }
    }
  };

  const onRouteCreateUser = () => {
    router.push('/auth/register');
  };

  return (
    <>
      <Head>
        <title>로그인</title>
      </Head>
      <main>
        <div className={styles.page}>
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
              <Button
                status="primary"
                type="button"
                onClick={onRouteCreateUser}
              >
                회원가입 하러가기
              </Button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
};

export default withRouter(Login);
