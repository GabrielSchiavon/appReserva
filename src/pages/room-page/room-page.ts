import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, ModalController, ToastController  } from 'ionic-angular';

import { ConnectionService } from '../../providers/connection-service';
import { RoomModal } from './../room-modal/room-modal';

import { Sala } from '../../models/Sala';
import { Encapsular } from '../../models/Encapsular';
import { Login } from '../../models/Login';

@IonicPage()
@Component({
  selector: 'page-room-page',
  templateUrl: 'room-page.html',
})
export class RoomPage {

  private rooms: Array<Sala>;
  private login: Login = new Login(1, "admin", "admin", 4);

  constructor(public navCtrl: NavController, private connection: ConnectionService,
    private alert: AlertController, private modalCtrl: ModalController,
    private toastCtrl: ToastController) {
      this.callLoadRoom();
  }

  confirmationAlert() {
    let toast = this.toastCtrl.create({
      message: 'Operação realizada com sucesso!',
      duration: 1500
    });
    toast.present();
  }

  callLoadRoom() {
    this.connection.loadRoom()
      .then( (data: Array<Sala>) => {
        this.rooms = data;
      }, (error) => {
        console.log("Ocorreu um erro ao carregar os Salas", error);
      })
  }

  removeRoom(room: Sala) {
    let alert = this.alert.create({
      title: 'Deletar Sala ?',
      message: 'Deseja realmente deletar a sala \'' + room.numero + '\'?',
      buttons: [
        {text: 'Cancelar'},
        {
          text: 'Deletar',
        handler: (data) => {
          let encapsular: any = new Encapsular(JSON.stringify(this.login), JSON.stringify(room), "");
          this.connection.removeRoom(encapsular)
            .then( (resp) => {
              this.confirmationAlert();
              this.callLoadRoom()
            }, (error) => {
              console.log("Erro ao deletar sala", error);
            })
          }
        }
      ]
    });

    alert.present();
  }

  updateRoom(room: Sala) {
    console.log(room);
    let modal = this.modalCtrl.create(RoomModal, {room: room});

    modal.onDidDismiss( () => {
      if (this.callLoadRoom()) {
        this.confirmationAlert();
      }
    });
    modal.present();
  }

  createRoom() {
    let modal = this.modalCtrl.create(RoomModal);

    modal.onDidDismiss( () => {
      this.callLoadRoom();
    });
    modal.present();
  }

}
