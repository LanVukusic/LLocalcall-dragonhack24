import { atom } from 'nanostores';
import { Transcript } from '../api/model';

interface User {
  name: string;
  token: string;
  transcripts: Transcript[];
}
export const $currUser = atom<User | null>(null);
