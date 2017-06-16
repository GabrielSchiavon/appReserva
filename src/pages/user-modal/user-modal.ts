import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController } from 'ionic-angular';

import { ConnectionService } from '../../providers/connection-service';
import { Usuario } from '../../models/Usuario';
import { Departamento } from '../../models/Departamento';
import { Encapsular } from '../../models/Encapsular';
import { Login } from '../../models/Login';

@IonicPage()
@Component({
  selector: 'page-user-modal',
  templateUrl: 'user-modal.html',
})
export class UserModal {
  user: Usuario;
  users: Array<Usuario>;
  departaments: Array<Departamento>;
  private login: Login = new Login(1, "admin", "admin", 4);

  constructor(public navCtrl: NavController, public navParams: NavParams,
  private view: ViewController, private connection: ConnectionService,
  private toastCtrl: ToastController) {
    this.callLoadDepartament();
    this.callLoadUser();
    this.user = this.navParams.get('user') || {};
  }

  callLoadDepartament() {
    this.connection.loadDepartament()
      .then( (data: Array<Departamento>) => {
        this.departaments = data;
      }, (error) => {
        console.log("Ocorreu um erro ao carregar os Departamentos", error);
      })
  }

  callLoadUser() {
    this.connection.loadUser()
      .then( (data: Array<Usuario>) => {
        this.users = data;
      }, (error) => {
        console.log("Ocorreu um erro ao carregar os usuários", error);
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
    let encapsulate = new Encapsular(JSON.stringify(this.login), JSON.stringify(this.user), "");
    if (this.user.id != undefined) {
      this.connection.updateUser(encapsulate)
        .then( (resp) => {
          if (resp) {
            this.confirmationAlert();
            this.view.dismiss();
          }
        }, (error) => {
          console.log('Erro ao atualizar Usuário', error);
        } );
    } else {
      this.user.senha = "reserva";
      this.connection.insertUser(encapsulate)
        .then( (resp) => {
          if (resp) {
            this.confirmationAlert();
            this.view.dismiss();
          }
        }, (error) => {
          console.log('Erro ao cadastrar sala', error);
        } );
    }
  }

}
