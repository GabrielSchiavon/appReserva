export class AnoLetivo {
  id: number;
  iddepartamento: number;
  iniciap: string;
  fimp: string;
  inicias: string;
  fims: string;
  status: number

  constructor (id?: number, iddepartamento?: number, iniociop?: string, fimp?: string,
    inicios?: string, fims?:string, status?: number) {
      if (id) {
        this.id = id;
        this.iddepartamento = iddepartamento;
        this.iniciap = iniociop;
        this.fimp = fimp;
        this.inicias = inicios;
        this.fims = fims;
        this.status = status;
      } else {
        id = -1;
        this.iniciap = "";
        this.inicias = "";
        this.fimp = "";
        this.fims = "";
        status = 0;
      }
    }

  get getId(): any {
    return this.id;
  }

  set setId(id: number) {
    this.id = id;
  }

  get getIdDepartamento(): any {
    return this.iddepartamento;
  }

  set setIdDepartamento(iddepartamento: number) {
    this.iddepartamento = iddepartamento;
  }

  get getInicioP(): any {
    return this.iniciap;
  }

  set setInicioP(iniciop: string) {
    this.iniciap = iniciop;
  }

  get getFimP(): any {
    return this.fimp;
  }

  set setFimP(fimp: string) {
    this.fimp = fimp;
  }

  get getInicioS(): any {
    return this.inicias;
  }

  set setInicioS(inicias: string) {
    this.inicias = inicias;
  }

  get getFimS(): string {
    return this.fims;
  }

  set setFimS(fims: string) {
    this.fims = fims;
  }

  get getStatus(): any {
    return this.status;
  }

  set setStatus(status: number) {
    this.status = status;
  }
}
