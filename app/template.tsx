'use client';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import React, { useEffect } from 'react';
import { fbAuth } from './common/lib/firebase/firebase';
import RootWrapper from './RootWrapper';

export default function Template({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    onAuthStateChanged(fbAuth, (user) => {
      console.log(user);
    });
  }, []);

  return (
    <>
      <RootWrapper>{children}</RootWrapper>
      <button
        onClick={() => {
          signOut(fbAuth);
        }}
      >
        로그아웃
      </button>
    </>
  );
}
