export type UserRequest = {
  sub: string;
  username: string;
  iat: number;
  exp: number;
};

export interface RequestWithUAT extends Request {
  user: UserRequest;
}
