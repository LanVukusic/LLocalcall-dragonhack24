import { atom } from 'nanostores';
import { Meeting } from '../api/model';

export const $activeMeet = atom<Meeting | null>(null);
