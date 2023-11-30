import { Quote } from '.';

export interface Item extends Quote {
  key: string;
  depth: number;
};