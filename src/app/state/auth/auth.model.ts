import { User } from '../../services/resources/user.resource';

export interface AuthStateModel {
  token: string;
  user?: User;
  loaded: boolean;
}
