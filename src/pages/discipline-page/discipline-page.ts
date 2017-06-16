import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, ModalController, ToastController  } from 'ionic-angular';

import { ConnectionService } from '../../providers/connection-service';
import { DisciplineModal } from './../discipline-modal/discipline-modal';

import { Disciplina } from '../../models/Disciplina';
import { Encapsular } from '../../models/Encapsular';
import { Login } from '../../models/Login';

@IonicPage()
@Component({
  selector: 'page-discipline-page',
  templateUrl: 'discipline-page.html',
})
export class DisciplinePage {

  private disciplines: Array<Disciplina>;
  private login: Login = new Login(1, "admin", "admin", 4);

  constructor(public navCtrl: NavController, private connection: ConnectionService,
    private alert: AlertController, private modalCtrl: ModalController,
    private toastCtrl: ToastController) {
      this.callLoadDiscipline();
  }

  confirmationAlert() {
    let toast = this.toastCtrl.create({
      message: 'Operação realizada com sucesso!',
      duration: 1500
    });
    toast.present();
  }

  callLoadDiscipline() {
    this.connection.loadDiscipline()
      .then( (data: Array<Disciplina>) => {
        this.disciplines = data;
      }, (error) => {
        console.log("Ocorreu um erro ao carregar os Disciplinas", error);
      });
  }

  removeDiscipline(discipline: Disciplina) {
    let alert = this.alert.create({
      title: 'Deletar Disciplina ?',
      message: 'Deseja realmente deletar a disciplina \'' + discipline.nome + '\'?',
      buttons: [
        {text: 'Cancelar'},
        {
          text: 'Deletar',
        handler: (data) => {
          let encapsular: any = new Encapsular(JSON.stringify(this.login), JSON.stringify(discipline), "");
          this.connection.removeDiscipline(encapsular)
            .then( (resp) => {
              this.confirmationAlert();
              this.callLoadDiscipline()
            }, (error) => {
              console.log("Erro ao deletar disciplina", error);
            })
          }
        }
      ]
    });

    alert.present();
  }

  updateDiscipline(discipline: Disciplina) {
    console.log(discipline);
    let modal = this.modalCtrl.create(DisciplineModal, {discipline: discipline});

    modal.onDidDismiss( () => {
      if (this.callLoadDiscipline()) {
        this.confirmationAlert();
      }
    });
    modal.present();
  }

  createDiscipline() {
    let modal = this.modalCtrl.create(DisciplineModal);

    modal.onDidDismiss( () => {
      this.callLoadDiscipline();
    });
    modal.present();
  }

}
