import { persistentAtom } from '@nanostores/persistent';
import { Transcript } from '../api/model';

interface User {
  name: string;
  token: string;
  sub: number;
  transcripts: Transcript[];
}
export const $currUser = persistentAtom<User | null>('user', null, {
  encode: JSON.stringify,
  decode: JSON.parse,
});
