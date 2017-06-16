import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, ModalController, ToastController  } from 'ionic-angular';

import { ConnectionService } from '../../providers/connection-service';
import { AcademicYearModal } from './../academic-year-modal/academic-year-modal';

import { AnoLetivo } from '../../models/AnoLetivo';
import { Departamento } from '../../models/Departamento';
import { Encapsular } from '../../models/Encapsular';
import { Login } from '../../models/Login';

@IonicPage()
@Component({
  selector: 'page-academic-year-page',
  templateUrl: 'academic-year-page.html',
})
export class AcademicYearPage {

  academicYear: AnoLetivo;
  academicYears: Array<AnoLetivo>;
  departaments: Array<Departamento>;
  private login: Login = new Login(1, "admin", "admin", 4);

  constructor(public navCtrl: NavController, private connection: ConnectionService,
    private alert: AlertController, private modalCtrl: ModalController,
    private toastCtrl: ToastController) {
      this.callLoadDepartament();
      this.callLoadAcademicYear();
  }

  confirmationAlert() {
    let toast = this.toastCtrl.create({
      message: 'Operação realizada com sucesso!',
      duration: 1500
    });
    toast.present();
  }

  callLoadAcademicYear() {
    let that = this;
    this.connection.loadAcademicYearISO8601()
      .then( function (data: Array<AnoLetivo>) {
        that.academicYears = data;
      }, (error) => {
        console.log("Ocorreu um erro ao carregar os Anos Letivos", error);
      })
  }

  public callLoadDepartament() {
    let that = this;
    this.connection.loadDepartament()
      .then( function (data: Array<Departamento>) {
        that.departaments = data;
      }, (error) => {
        console.log("Ocorreu um erro ao carregar os departamentos", error);
      });
  }

  removeAcademicYear(academicYear: AnoLetivo) {
    let alert = this.alert.create({
      title: 'Deletar Usuário?',
      message: 'Deseja realmente deletar o ano letivo \'' + academicYear.id + '\'?',
      buttons: [
        {text: 'Cancelar'},
        {
          text: 'Deletar',
        handler: (data) => {
          let encapsular: any = new Encapsular(JSON.stringify(this.login), JSON.stringify(academicYear), "");
          this.connection.removeAcademicYear(encapsular)
            .then( (resp) => {
              this.confirmationAlert();
              this.callLoadAcademicYear()
            }, (error) => {
              console.log("Erro ao deletar ano letivo", error);
            })
          }
        }
      ]
    });

    alert.present();
  }

  updateAcademicYear(academicYear: AnoLetivo) {
    let modal = this.modalCtrl.create(AcademicYearModal, {academicYear: academicYear});

    modal.onDidDismiss( () => {
      if (this.callLoadAcademicYear()) {
        this.confirmationAlert();
      }
    });
    modal.present();
  }

  createAcademicYear() {
    let modal = this.modalCtrl.create(AcademicYearModal);

    modal.onDidDismiss( () => {
      this.callLoadAcademicYear();
    });
    modal.present();
  }


}
