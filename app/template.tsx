import React from 'react';
import RootWrapper from './RootWrapper';
import styles from './template.module.css';

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.template}>
      <RootWrapper>{children}</RootWrapper>
    </div>
  );
}
