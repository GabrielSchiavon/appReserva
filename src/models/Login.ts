export class Login {
  id: number;
  email: string;
  senha: string;
  permissao: number;

  constructor(idLogin?: number, emailLogin?: string, senhaLogin?: string,
      permissaoLogin?: number) {
    if (idLogin) {
      this.id = idLogin;
      this.email = emailLogin;
      this.senha = senhaLogin;
      this.permissao = permissaoLogin;
    } else {
      this.id = -1;
      this.email = "";
      this.senha = "";
      this.permissao = 0;
    }
  }

  public getId(): number {
    return this.id;
  }

  public setId(idLogin: number): void {
    this.id = idLogin;
  }

  public getEmail(): string {
    return this.email;
  }

  public setEmail(emailLogin: string): void {
    this.email = emailLogin;
  }

  public getSenha(): string {
    return this.senha;
  }

  public setSenha(senhaLogin: string): void {
    this.senha = senhaLogin;
  }

  public getPermissao(): number {
    return this.permissao;
  }

  public setPermissao(permissaoLogin: number): void {
    this.permissao = permissaoLogin;
  }

  public clone(login: Login): void {
    this.id = login.getId();
    this.email = login.getEmail();
    this.senha = login.getSenha();
    this.permissao = login.getPermissao();
  }
}
