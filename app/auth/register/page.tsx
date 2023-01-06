'use client';
import { useMutation } from '@tanstack/react-query';
import React, { useRef } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import {
  FormIdError,
  FormNameError,
  FormPasswordConfirmError,
  FormPasswordError,
} from '../components/registerFormError';
import styles from './register.module.css';
import { createUser } from './services/registerServices';

type RegisterForm = {
  name: string;
  id: string;
  password: string;
  passwordConfirm: string;
};

const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterForm>();

  const passwordRef = useRef<string | null>(null);
  passwordRef.current = watch('password');

  const onSubmit: SubmitHandler<RegisterForm> = async (data) => {
    const user = await createUser(data.id, data.password);
    console.log(user);
  };

  return (
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
          placeholder="최대 10자, 사용자에게 보여줄 닉네임을 적어주세요"
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
        />
        <FormPasswordConfirmError fieldError={errors.passwordConfirm} />
      </div>

      <button type="submit">회원가입</button>
    </form>
  );
};

export default Register;
