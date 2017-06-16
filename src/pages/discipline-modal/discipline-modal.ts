import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController } from 'ionic-angular';

import { ConnectionService } from '../../providers/connection-service';
import { Disciplina } from '../../models/Disciplina';
import { Departamento } from '../../models/Departamento';
import { Curso } from '../../models/Curso';
import { Encapsular } from '../../models/Encapsular';
import { Login } from '../../models/Login';

@IonicPage()
@Component({
  selector: 'page-discipline-modal',
  templateUrl: 'discipline-modal.html',
})
export class DisciplineModal {

  discipline: Disciplina;
  disciplines: Array<Disciplina>;
  departaments: Array<Departamento>;
  courses: Array<Curso>;
  private login: Login = new Login(1, "admin", "admin", 4);

  constructor(public navCtrl: NavController, public navParams: NavParams,
  private view: ViewController, private connection: ConnectionService,
  private toastCtrl: ToastController) {
    this.callLoadDepartament();
    this.callLoadCourse();
    this.callLoadDiscipline();
    this.discipline = this.navParams.get('discipline') || {};
    console.log(this.discipline);
  }

  callLoadDepartament() {
    this.connection.loadDepartament()
      .then( (data: Array<Departamento>) => {
        this.departaments = data;
      }, (error) => {
        console.log("Ocorreu um erro ao carregar os Departamentos", error);
      })
  }

  callLoadCourse() {
    this.connection.loadCourse()
      .then( (data: Array<Curso>) => {
        this.courses = data;
      }, (error) => {
        console.log("Ocorreu um erro ao carregar os cursos", error);
      })
  }

  callLoadDiscipline() {
    this.connection.loadDiscipline()
      .then( (data: Array<Disciplina>) => {
        this.disciplines = data;
      }, (error) => {
        console.log("Ocorreu um erro ao carregar as disciplinas", error);
      })
  }

  confirmationAlert() {
  let toast = this.toastCtrl.create({
    message: 'Operação realizada com sucesso!',
    duration: 1500
  });
  toast.present();
  }

  close() {
    this.view.dismiss();
  }

  save() {
    let encapsulate = new Encapsular(JSON.stringify(this.login), JSON.stringify(this.discipline), "");
    if (this.discipline.id != undefined) {
      this.connection.updateDiscipline(encapsulate)
        .then( (resp) => {
          if (resp) {
            this.confirmationAlert();
            this.view.dismiss();
          }
        }, (error) => {
          console.log('Erro ao atualizar disciplina', error);
        } );
    } else {
      this.connection.insertDiscipline(encapsulate)
        .then( (resp) => {
          if (resp) {
            this.confirmationAlert();
            this.view.dismiss();
          }
        }, (error) => {
          console.log('Erro ao cadastrar disciplina', error);
        } );
    }
  }

}
