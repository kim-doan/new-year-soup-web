'use client';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import React, { useEffect } from 'react';
import RootWrapper from './RootWrapper';
import styles from './template.module.css';

export default function Template({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const res = onAuthStateChanged(getAuth(), (user) => {
      console.log(user);
    });
  }, []);

  return (
    <div className={styles.template}>
      <RootWrapper>{children}</RootWrapper>
      <button>a</button>
    </div>
  );
}
