export class Login {
  static type = '[Auth] Login';

  constructor(
    public username: string,
    public password: string
  ) {}
}

export class Logout {
  static type = '[Auth] Logout';
}

export class Verify {
  static type = '[Auth] Verify';
}
