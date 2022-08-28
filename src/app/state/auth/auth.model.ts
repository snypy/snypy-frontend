import { User } from '@snypy/rest-client';

export interface AuthStateModel {
  token: string;
  user?: User;
  loaded: boolean;
}
