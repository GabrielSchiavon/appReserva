export class Usuario {
  id: number;
  id_departamento: number;
  nome: string;
  email: string;
  senha: string;
  telefone: string;
  permissao: number;
  id_disciplinas: string;
  problema_locomocao: number;
  status: number;

  constructor(id?: number, id_departamento?: number, nome?: string, email?:string,
    senha?: string, telefone?: string, permissao?: number, disciplinas?: string,
    problemalocomocao?: number, status?: number) {
      if (id) {
        this.id = id;
        this.id_departamento = id_departamento;
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.telefone = telefone;
        this.permissao = permissao;
        this.id_disciplinas = disciplinas;
        this.problema_locomocao = problemalocomocao;
        this.status = status;
      } else {
        this.id = -1;
        this.permissao = -1;
      }
    }

    get getId() {
      return this.id;
    }

    set setId(id: number) {
      this.id = id;
    }

    get getIdDepartamento() {
      return this.id_departamento;
    }

    set setIdDepartamento(idDepartamento: number) {
      this.id_departamento = idDepartamento;
    }

    get getNome() {
      return this.nome;
    }

    set setNome(nome: string) {
      this.nome = nome;
    }

    get getEmail() {
      return this.email;
    }

    set setEmail(email: string) {
      this.email = email;
    }

    get getSenha() {
      return this.senha;
    }

    set setSenha(senha: string) {
      this.senha = senha;
    }

    get getTelefone() {
      return this.telefone;
    }

    set setTelefone(telefone: string) {
      this.telefone = telefone;
    }

    get getPermissao() {
      return this.permissao;
    }

    set setPermissao(permissao: number) {
      this.permissao = permissao;
    }

    get getIdDisciplinas() {
      return this.id_disciplinas;
    }

    set setIdDisciplinas(id_disciplinas: string) {
      this.id_disciplinas = id_disciplinas;
    }

    get getProblemaLocomocao() {
      return this.problema_locomocao;
    }

    set setProblemaLocomocao(problemaLocomocao: number) {
      this.problema_locomocao = problemaLocomocao;
    }

    get getStatus() {
      return this.status;
    }

    set setStatus(status: number) {
      this.status = status;
    }
}
