import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController } from 'ionic-angular';

import { ConnectionService } from '../../providers/connection-service';
import { AnoLetivo } from '../../models/AnoLetivo';
import { Departamento } from '../../models/Departamento';
import { Encapsular } from '../../models/Encapsular';
import { Login } from '../../models/Login';

@IonicPage()
@Component({
  selector: 'page-academic-year-modal',
  templateUrl: 'academic-year-modal.html',
})
export class AcademicYearModal {

  academicYear: AnoLetivo;
  academicYears: Array<AnoLetivo>;
  departaments: Array<Departamento>;
  
  private login: Login = new Login(1, "admin", "admin", 4);

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private view: ViewController, private connection: ConnectionService,
    private toastCtrl: ToastController) {
      this.callLoadDepartament();
      this.callLoadAcademicYear();
      this.academicYear = this.navParams.get('academicYear') || {};
  }

  callLoadDepartament() {
    this.connection.loadDepartament()
      .then( (data: Array<Departamento>) => {
        this.departaments = data;
      }, (error) => {
        console.log("Ocorreu um erro ao carregar os Departamentos", error);
      })
  }

  callLoadAcademicYear() {
    this.connection.loadAcademicYearISO8601()
      .then( (data: Array<AnoLetivo>) => {
        this.academicYears = data;
      }, (error) => {
        console.log("Ocorreu um erro ao carregar os ano letivos", error);
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

  changeDateToString(value: any): string {
    return value.year.toString() + '-' + value.month.toString() + '-' + value.day.toString();
  }

  save() {
    console.log(this.academicYear)
    let encapsulate = new Encapsular(JSON.stringify(this.login), JSON.stringify(this.academicYear), "");
    if (this.academicYear.id != undefined) {
      this.connection.updateAcademicYear(encapsulate)
        .then( (resp) => {
          if (resp) {
            this.confirmationAlert();
            this.view.dismiss();
          }
        }, (error) => {
          console.log('Erro ao atualizar ano letivo', error);
        } );
    } else {
      this.connection.insertAcademicYear(encapsulate)
        .then( (resp) => {
          if (resp) {
            this.confirmationAlert();
            this.view.dismiss();
          }
        }, (error) => {
          console.log('Erro ao cadastrar ano letivo', error);
        } );
    }
  }

}
