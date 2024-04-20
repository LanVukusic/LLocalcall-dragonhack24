import { atom } from 'nanostores';

interface User {
    name:string;
    token:string;
}
export const $currUser = atom<User | null>(null);
