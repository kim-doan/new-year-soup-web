'use client';
import Image from 'next/image';
import titleLogo from 'assets/default/titleLogo.png';
import { useRouter } from 'next/navigation';
import React, { useRef } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import {
  FormIdError,
  FormNameError,
  FormPasswordConfirmError,
  FormPasswordError,
} from '../../components/form/authFormError';
import styles from './register.module.css';
import Button from '../../components/button/button';
import { AuthService } from 'core';
import Head from 'next/head';

type RegisterForm = {
  name: string;
  id: string;
  password: string;
  passwordConfirm: string;
};

const Register = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterForm>();

  const passwordRef = useRef<string | null>(null);
  passwordRef.current = watch('password');

  const { createUser } = new AuthService();

  const onSubmit: SubmitHandler<RegisterForm> = async (data) => {
    const res = await createUser(data.id, data.password, data.name);

    if (res) {
      router.push('/auth/login');
    }
  };

  const onRouteBack = () => {
    router.back();
  };

  return (
    <>
      <main>
        <Head>
          <title>회원가입</title>
        </Head>
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
                placeholder="영문, 숫자 5~12자"
              />
              <FormIdError fieldError={errors.id} />
            </div>
            <div className={styles.inputWrapper}>
              <label>사용자 닉네임</label>
              <input
                {...register('name', { required: true, maxLength: 10 })}
                maxLength={10}
                placeholder="사용자에게 보여줄 닉네임, 최대 10자"
              />
              <FormNameError fieldError={errors.name} />
            </div>
            <div className={styles.inputWrapper}>
              <label>비밀번호</label>
              <input
                {...register('password', { required: true, minLength: 8 })}
                type="password"
                maxLength={30}
                placeholder="최소 8자이상 입력"
              />
              <FormPasswordError fieldError={errors.password} />
            </div>
            <div className={styles.inputWrapper}>
              <label>비밀번호 확인</label>
              <input
                {...register('passwordConfirm', {
                  required: true,
                  validate: (value) => value === passwordRef.current,
                })}
                maxLength={30}
                type="password"
                placeholder="비밀번호와 일치하게 입력해주세요"
              />
              <FormPasswordConfirmError fieldError={errors.passwordConfirm} />
            </div>

            <div className={styles.buttonWrapper}>
              <Button status="main" type="submit">
                회원가입
              </Button>
              <Button status="primary" type="button" onClick={onRouteBack}>
                뒤로가기
              </Button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
};

export default Register;
