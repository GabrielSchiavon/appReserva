import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController } from 'ionic-angular';

import { ConnectionService } from '../../providers/connection-service';
import { Departamento } from '../../models/Departamento';
import { Encapsular } from '../../models/Encapsular';
import { Login } from '../../models/Login';


@IonicPage()
@Component({
  selector: 'page-departament-modal',
  templateUrl: 'departament-modal.html',
})
export class DepartamentModal {
  departament: Departamento;
  departaments: Array<Departamento>;
  private login: Login = new Login(1, "admin", "admin", 4);

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private view: ViewController, private connection: ConnectionService,
    private toastCtrl: ToastController) {
      this.callLoadDepartament();
      this.departament = this.navParams.get('departament') || {};
  }

  callLoadDepartament() {
    this.connection.loadDepartament()
      .then( (data: Array<Departamento>) => {
        this.departaments = data;
      }, (error) => {
        console.log("Ocorreu um erro ao carregar os Departamentos", error);
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
    let encapsulate = new Encapsular(JSON.stringify(this.login), JSON.stringify(this.departament), "");
    if (this.departament.id != undefined) {
      this.connection.updateDepartament(encapsulate)
        .then( (resp) => {
          if (resp) {
            this.confirmationAlert();
            this.view.dismiss();
          }
        }, (error) => {
          console.log('Erro ao atualizar curso', error);
        } );

    } else {
      this.connection.insertDepartament(encapsulate)
        .then( (resp) => {
          if (resp) {
            this.confirmationAlert();
            this.view.dismiss();
          }
        }, (error) => {
          console.log('Erro ao cadastrar curso', error);
        } );
    }

  }

}
