export class Sala {
  id: number;
  numero: number;
  iddepartamento: number;
  classificacao: number;
  descricao: string;
  status: number;

  constructor(id?: number, numero?: number, iddepartamento?: number,
    classificacao?: number, descricao?: string, status?: number) {
      if (id) {
        this.id = id;
        this.numero = numero;
        this.iddepartamento = iddepartamento;
        this.classificacao = classificacao;
        this.descricao = descricao;
        this.status = status;
      } else {
        this.id = -1;
      }
    }
}
