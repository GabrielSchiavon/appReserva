export class Curso {
  id: number;
  IdDepartamento: number;
  nome: string;
  tipo: number;
  descricao: string;
  status: number;

  constructor(idCurso?: number, idDepartCurso?: number, nomeCurso?: string,
    tipoCurso?: number, descricaoCourse?: string, statusCurso?: number) {

    if (idCurso) {
      this.id = idCurso;
      this.IdDepartamento = idDepartCurso;
      this.nome = nomeCurso;
      this.tipo = tipoCurso;
      this.descricao = descricaoCourse;
      this.status = statusCurso;
    } else {
      this.id = -1;
    }

  }

   public getId(): number {
        return this.id;
    }

    public setId(id: number): void {
        this.id = id;
    }

    public getIdDepartamento(): number {
        return this.IdDepartamento;
    }

    public setIdDepartamento(IdDepartamento: number): void {
        this.IdDepartamento = IdDepartamento;
    }

    public getNome(): string  {
        return this.nome;
    }

    public setNome(nome: string): void {
        this.nome = nome;
    }

    public gettipo(): number {
        return this.tipo;
    }

    public settipo(tipo: number): void {
        this.tipo = tipo;
    }

    public getDescricao(): string {
        return this.descricao;
    }

    public setDescricao(descricao: string ): void {
        this.descricao = descricao;
    }

    public getStatus(): number {
        return this.status;
    }

    public setStatus(status: number): void {
        this.status = status;
    }
}
