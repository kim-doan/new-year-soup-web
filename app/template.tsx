import React from 'react';
import RootWrapper from './RootWrapper';
import styles from './template.module.css';

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <main className={styles.main}>
      <RootWrapper>{children}</RootWrapper>
    </main>
  );
}
