export class Reserva {
  id: number;
  iddepartamento: number;
  idusuario: number;
  tipoaula: number;
  iddisciplina: number;
  tipo: number;
  dataefetuacao: string;
  proximoid: number;
  datareserva: string;
  periodo: number;
  tiposala: number;
  idsala: number;
  status: number;

  constructor(id?: number, iddepartamento?: number, idusuario?: number, tipoaula?: number,
    iddisciplina?: number, tipo?: number, dataefetuacao?: string, proximoid?: number,
    datareserva?: string, periodo?: number, tiposala?: number, idsala?: number, status?: number) {
      if (id) {
        this.id = id;
        this.iddepartamento = iddepartamento;
        this.idusuario = idusuario;
        this.tipoaula = tipoaula;
        this.iddisciplina = iddisciplina;
        this.tipo = tipo;
        this.dataefetuacao = dataefetuacao;
        this.proximoid = proximoid;
        this.datareserva = datareserva;
        this.periodo = periodo;
        this.tiposala = tiposala;
        this.idsala = idsala;
        this.status = status;
      } else {
        this.id = -1;
        this.iddisciplina = -1;
        this.idsala = -1;
        this.tiposala = -1;
      }
    }

    get getId() {
      return this.id;
    }

    set setId(id: number) {
      this.id = id;
    }

    get getIddepartamento() {
      return this.iddepartamento;
    }

    set setIddepartamento(iddepartamento: number) {
      this.iddepartamento = iddepartamento;
    }

    get getIdusuario() {
      return this.idusuario;
    }

    set setIdusuario(idusuario: number) {
      this.idusuario = idusuario;
    }

    get getTipoaula() {
      return this.tipoaula;
    }

    set setTipoaula(tipoaula: number) {
      this.tipoaula = tipoaula;
    }

    get getIddisciplina() {
      return this.iddisciplina;
    }

    set setIddisciplina(iddisciplina) {
      this.iddisciplina = iddisciplina;
    }

    get getTipo() {
      return this.tipo;
    }

    set setTipo(tipo: number) {
      this.tipo = tipo;
    }

    get getDataEfetuacao() {
      return this.dataefetuacao;
    }

    set setDataefetuacao(dataefetuacao: string) {
      this.dataefetuacao = dataefetuacao;
    }

    get getDatareserva() {
      return this.datareserva;
    }

    set setDatareserva(datareserva: string) {
      this.datareserva = datareserva;
    }

    get getProximoid() {
      return this.proximoid;
    }

    set setProximoid(proximoid: number) {
      this.proximoid = proximoid;
    }

    get getPeriodo() {
      return this.periodo;
    }

    set setPeriodo(periodo: number) {
      this.periodo = periodo;
    }

    get getTiposala() {
      return this.tiposala;
    }

    set setTiposala(tiposala: number) {
      this.tiposala = tiposala;
    }

    get getIdsala() {
      return this.idsala;
    }

    set setIdsala(idsala: number) {
      this.idsala = idsala;
    }

    get getStatus() {
      return this.status;
    }

    set setSatatus(status: number) {
      this.status = status;
    }

}
