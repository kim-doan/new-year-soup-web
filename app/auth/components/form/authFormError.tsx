import { FieldError } from 'react-hook-form';
import React from 'react';

import styles from './authFormError.module.css';

interface FormErrorProps {
  fieldError?: FieldError;
}

export const FormNameError = ({ fieldError }: FormErrorProps) => {
  return (
    <div className={styles.formErrorWrapper}>
      {fieldError && fieldError.type === 'required' && (
        <div className={styles.formError}>닉네임을 입력해 주세요</div>
      )}
    </div>
  );
};

export const FormIdError = ({ fieldError }: FormErrorProps) => {
  return (
    <div className={styles.formErrorWrapper}>
      {fieldError && fieldError.type === 'required' && (
        <div className={styles.formError}>아이디를 입력해 주세요</div>
      )}
      {fieldError && fieldError.type === 'pattern' && (
        <div className={styles.formError}>
          아이디는 영어, 숫자만 입력 가능합니다
        </div>
      )}
      {fieldError && fieldError.type === 'minLength' && (
        <div className={styles.formError}>아이디는 5자 이상이어야 합니다</div>
      )}
    </div>
  );
};

export const FormPasswordError = ({ fieldError }: FormErrorProps) => {
  return (
    <div className={styles.formErrorWrapper}>
      {fieldError && fieldError.type === 'required' && (
        <div className={styles.formError}>비밀번호를 입력해 주세요</div>
      )}
      {fieldError && fieldError.type === 'minLength' && (
        <div className={styles.formError}>비밀번호는 8자 이상이어야 합니다</div>
      )}
    </div>
  );
};

export const FormPasswordConfirmError = ({ fieldError }: FormErrorProps) => {
  return (
    <div className={styles.formErrorWrapper}>
      {fieldError && fieldError.type === 'required' && (
        <div className={styles.formError}>비밀번호를 확인해 주세요</div>
      )}
      {fieldError && fieldError.type === 'validate' && (
        <div className={styles.formError}>비밀번호가 일치하지 않습니다</div>
      )}
    </div>
  );
};
