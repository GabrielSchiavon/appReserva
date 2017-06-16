import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, ModalController, ToastController  } from 'ionic-angular';

import { ConnectionService } from '../../providers/connection-service';
import { UserModal } from './../user-modal/user-modal';

import { Usuario } from '../../models/Usuario';
import { Departamento } from '../../models/Departamento';
import { Encapsular } from '../../models/Encapsular';
import { Login } from '../../models/Login';

@IonicPage()
@Component({
  selector: 'page-user-page',
  templateUrl: 'user-page.html',
})
export class UserPage {
  searchQuery: string = '';
  private users: Array<Usuario>;
  departaments: Array<Departamento>;
  private login: Login = new Login(1, "admin", "admin", 4);

  constructor(public navCtrl: NavController, private connection: ConnectionService,
    private alert: AlertController, private modalCtrl: ModalController,
    private toastCtrl: ToastController) {
      this.callLoadDepartament();
      this.callLoadUser();
  }

  confirmationAlert() {
    let toast = this.toastCtrl.create({
      message: 'Operação realizada com sucesso!',
      duration: 1500
    });
    toast.present();
  }

  callLoadUser() {
    this.connection.loadUser()
      .then( (data: Array<Usuario>) => {
        this.users = data;
      }, (error) => {
        console.log("Ocorreu um erro ao carregar os usuarios", error);
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

  removeUser(user: Usuario) {
    let alert = this.alert.create({
      title: 'Deletar Usuário?',
      message: 'Deseja realmente deletar o usuário \'' + user.nome + '\'?',
      buttons: [
        {text: 'Cancelar'},
        {
          text: 'Deletar',
        handler: (data) => {
          let encapsular: any = new Encapsular(JSON.stringify(this.login), JSON.stringify(user), "");
          this.connection.removeUser(encapsular)
            .then( (resp) => {
              this.confirmationAlert();
              this.callLoadUser()
            }, (error) => {
              console.log("Erro ao deletar usuário", error);
            })
          }
        }
      ]
    });

    alert.present();
  }

  updateUser(user: Usuario) {
    console.log(user);
    let modal = this.modalCtrl.create(UserModal, {user: user});

    modal.onDidDismiss( () => {
      if (this.callLoadUser()) {
        this.confirmationAlert();
      }
    });
    modal.present();
  }

  createUser() {
    let modal = this.modalCtrl.create(UserModal);

    modal.onDidDismiss( () => {
      this.callLoadUser();
    });
    modal.present();
  }

  getLocomotionProblemText(valor: number): string {
    if (valor == 0) {
      return "Não";
    } else {
      return "Sim";
    }
  }

  getUserPermissionText(permission: number): string {
    switch (permission) {
      case 1: { return "Docente"; }
      case 2: { return "Administrador de Sala"; }
      case 3: { return "Administrador de Departamento"; }
      case 4: { return "Administrador de Sistema"; }
    }
  }

  getNameDepartament(id: number) {
    for (let d of this.departaments) {
      if (d.id == id) {
        return d.descricao +" ("+d.nome+")";
      }
    }
  }

  showDetails(user: Usuario) {
    console.log(this.departaments);
    let locomotionProblem = this.getLocomotionProblemText(user.problema_locomocao);
    let permission = this.getUserPermissionText(user.permissao);
    let departamentName = this.getNameDepartament(user.id_departamento);
    let alert = this.alert.create({
      title: 'Detalhes: ',
      message: 'Nome: \'' + user.nome + '\'<br>'
               + 'Departamento: \'' + departamentName + '\'<br>'
               + 'Email: \'' + user.email + '\'<br>'
               + 'Telefone: \'' + user.telefone + '\'<br>'
               + 'Permissão: \'' + permission + '\'<br>'
               + 'Disciplinas: \'' + user.id_disciplinas + '\'<br>'
               + 'Problema de Locomoção: \'' + locomotionProblem + '\'<br>',
      cssClass: 'messageAlign',
      buttons: [
        {text: 'Voltar'},
        {
          text: 'Editar',
        handler: (data) => {
          let modal = this.modalCtrl.create(UserModal, {user: user});

          modal.onDidDismiss( () => {
            if (this.callLoadUser()) {
              this.confirmationAlert();
            }
          });
          modal.present();
          }
        }
      ]
    });

    alert.present();
  }

}
