'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RecoilRoot } from 'recoil';

const queryClient = new QueryClient();

type Props = {
  children: React.ReactNode;
};

const RootWrapper = ({ children }: Props) => (
  <QueryClientProvider client={queryClient}>
    <RecoilRoot>{children}</RecoilRoot>
  </QueryClientProvider>
);
export default RootWrapper;
