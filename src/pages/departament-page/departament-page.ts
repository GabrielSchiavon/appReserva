import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, ModalController, ToastController  } from 'ionic-angular';

import { ConnectionService } from '../../providers/connection-service';
import { DepartamentModal } from './../departament-modal/departament-modal';

import { Departamento } from '../../models/Departamento';
import { Encapsular } from '../../models/Encapsular';
import { Login } from '../../models/Login';

@IonicPage()
@Component({
  selector: 'page-departament-page',
  templateUrl: 'departament-page.html',
})
export class DepartamentPage {

  private departaments: Array<Departamento>;
  private login: Login = new Login(1, "admin", "admin", 4);

  constructor(public navCtrl: NavController, private connection: ConnectionService,
    private alert: AlertController, private modalCtrl: ModalController,
    private toastCtrl: ToastController) {
      this.callLoadDepartament();
  }

  confirmationAlert() {
    let toast = this.toastCtrl.create({
      message: 'Operação realizada com sucesso!',
      duration: 1500
    });
    toast.present();
  }

  callLoadDepartament() {
    this.connection.loadDepartament()
      .then( (data: Array<Departamento>) => {
        this.departaments = data;
      }, (error) => {
        console.log("Ocorreu um erro ao carregar os Departamentos", error);
      })
  }

  removeDepartament(departament: Departamento) {
    let alert = this.alert.create({
      title: 'Deletar Departamento ?',
      message: 'Deseja realmente deletar o curso \'' + departament.nome + '\'?',
      buttons: [
        {text: 'Cancelar'},
        {
          text: 'Deletar',
        handler: (data) => {
          let encapsular: any = new Encapsular(JSON.stringify(this.login), JSON.stringify(departament), "");
          this.connection.removeDepartament(encapsular)
            .then( (resp) => {
              this.confirmationAlert();
              this.callLoadDepartament()
            }, (error) => {
              console.log("Erro ao deletar curso", error);
            })
          }
        }
      ]
    });

    alert.present();
  }

  updateDepartament(departament: Departamento) {
    console.log(departament);
    let modal = this.modalCtrl.create(DepartamentModal, {departament: departament});

    modal.onDidDismiss( () => {
      if (this.callLoadDepartament()) {
        this.confirmationAlert();
      }
    });
    modal.present();
  }

  createDepartament() {
    let modal = this.modalCtrl.create(DepartamentModal);

    modal.onDidDismiss( () => {
      this.callLoadDepartament();
    });
    modal.present();
  }

}
