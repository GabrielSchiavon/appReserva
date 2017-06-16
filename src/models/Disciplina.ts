export class Disciplina {
  id: number;
  id_departamento: number;
  id_curso: number;
  codigo: number;
  periodo: number;
  turma: number;
  nome: string;
  classificacao: number;
  status: number;

  constructor(id?: number, id_departamento?: number, id_curso?: number,
    codigo?: number, periodo?: number, turma?: number, nome?: string,
    classificacao?: number, status?: number) {

    if (id) {
      this.id = id;
      this.id_departamento = id_departamento;
      this.id_curso = id_curso;
      this.codigo = codigo;
      this.periodo = periodo;
      this.turma = turma;
      this.nome = nome;
      this.classificacao = classificacao;
      this.status = status;
    } else {
      this.id = -1;
      this.status = 0;
    }
  }

  get getId() {
    return this.id;
  }

  set setId(id: number) {
    this.id = id;
  }

  get getId_departamento() {
    return this.id_departamento;
  }

  set setId_departamento(id: number) {
    this.id_departamento = id;
  }

  get getId_curso() {
    return this.id_curso;
  }

  set setId_curso(id: number) {
    this.id_curso = id;
  }

  get getCodigo() {
    return this.codigo;
  }

  set setCodigo(codigo: number) {
    this.codigo = codigo;
  }

  get getPeriodo() {
    return this.periodo;
  }

  set setPeriodo(periodo: number) {
    this.periodo = periodo;
  }

  get getTurma() {
    return this.turma;
  }

  set setTurma(turma: number) {
    this.turma = turma;
  }

  get getNome() {
    return this.nome;
  }

  set setNome(nome: string) {
    this.nome = nome;
  }

  get getClassificacao() {
    return this.classificacao;
  }

  set setClassificacao(classificacao: number) {
    this.classificacao = classificacao;
  }

  get getStatus() {
    return this.status;
  }

  set setStatus(status: number) {
    this.status = status;
  }
}
