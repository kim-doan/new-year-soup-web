import { atom } from 'recoil';
import { soupBowl1 } from 'assets/soups';

type SoupDecorationState = {
  dumpling: boolean;
  egg: boolean;
  gimgaru: boolean;
  greenOnion: boolean;
  meat: boolean;
  pepper: boolean;
};

export const SoupBowl = atom({
  key: 'soupBowl',
  default: soupBowl1,
});

export const SoupDecoration = atom<SoupDecorationState>({
  key: 'soupDecoration',
  default: {
    dumpling: false,
    egg: false,
    gimgaru: false,
    greenOnion: false,
    meat: false,
    pepper: false,
  },
});

export const FingerAction = atom({
  key: 'fingerAction',
  default: false,
});

export const SoupContents = atom({
  key: 'soupContents',
  default: '',
});
