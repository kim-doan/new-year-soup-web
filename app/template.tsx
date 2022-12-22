import React from 'react';
import RootWrapper from './RootWrapper';

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <RootWrapper>{children}</RootWrapper>
    </>
  );
}
