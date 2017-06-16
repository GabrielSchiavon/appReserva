import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController } from 'ionic-angular';

import { ConnectionService } from '../../providers/connection-service';
import { Sala } from '../../models/Sala';
import { Departamento } from '../../models/Departamento';
import { Encapsular } from '../../models/Encapsular';
import { Login } from '../../models/Login';

@IonicPage()
@Component({
  selector: 'page-room-modal',
  templateUrl: 'room-modal.html',
})
export class RoomModal {

  room: Sala;
  rooms: Array<Sala>;
  departaments: Array<Departamento>;
  private login: Login = new Login(1, "admin", "admin", 4);

  constructor(public navCtrl: NavController, public navParams: NavParams,
  private view: ViewController, private connection: ConnectionService,
  private toastCtrl: ToastController) {
    this.callLoadDepartament();
    this.callLoadRoom();
    this.room = this.navParams.get('room') || {};
  }

  callLoadDepartament() {
    this.connection.loadDepartament()
      .then( (data: Array<Departamento>) => {
        this.departaments = data;
      }, (error) => {
        console.log("Ocorreu um erro ao carregar os Departamentos", error);
      })
  }

  callLoadRoom() {
  this.connection.loadRoom()
    .then( (data: Array<Sala>) => {
      this.rooms = data;
    }, (error) => {
      console.log("Ocorreu um erro ao carregar as salas", error);
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
    let encapsulate = new Encapsular(JSON.stringify(this.login), JSON.stringify(this.room), "");
    if (this.room.id != undefined) {
      this.connection.updateRoom(encapsulate)
        .then( (resp) => {
          if (resp) {
            this.confirmationAlert();
            this.view.dismiss();
          }
        }, (error) => {
          console.log('Erro ao atualizar sala', error);
        } );
    } else {
      this.connection.insertRoom(encapsulate)
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
