import { atom } from 'recoil';

export const MySoupList = atom({
  key: 'mySoupList',
  default: '',
});

export const SoupMessage = atom({
  key: 'soupMessage',
  default: '',
});
