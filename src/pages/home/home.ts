import { Component } from '@angular/core';
import { NavController, AlertController, ModalController, ToastController  } from 'ionic-angular';

import { ConnectionService } from '../../providers/connection-service';
import { ReservationModal } from './../reservation-modal/reservation-modal';

import { Reserva } from '../../models/Reserva';
import { Sala } from '../../models/Sala';
import { Departamento } from '../../models/Departamento';
import { Encapsular } from '../../models/Encapsular';
import { Login } from '../../models/Login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private reservation: Reserva;
  private reservations: Array<Reserva>;
  private rooms: Array<Sala>;
  private departaments: Array<Departamento>;
  private login: Login = new Login(2, "admin", "admin", 4);

  constructor(public navCtrl: NavController, private connection: ConnectionService,
    private alert: AlertController, private modalCtrl: ModalController,
    private toastCtrl: ToastController) {
      this.callLoadRoom();
      this.callLoadDepartament();
      this.callLoadMyReservations();
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
        console.log("Ocorreu um erro ao carregar as Salas", error);
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

  public callLoadMyReservations() {
    let that = this;
    this.connection.loadReservation(this.login.getId())
      .then( function (data: Array<Reserva>) {
        that.reservations = data;
      }, (error) => {
        console.log("Ocorreu um erro ao carregar os departamentos", error);
      });
  }

  removeReservation(reservation: Reserva) {
    let alert = this.alert.create({
      title: 'Deletar Reserva ?',
      message: 'Deseja realmente deletar a reserva \'' + reservation.id + '\'?',
      buttons: [
        {text: 'Cancelar'},
        {
          text: 'Deletar',
        handler: (data) => {
          let encapsular: any = new Encapsular(JSON.stringify(this.login), JSON.stringify(reservation), "");
          this.connection.removeReservation(encapsular)
            .then( (resp) => {
              this.confirmationAlert();
              this.callLoadMyReservations()
            }, (error) => {
              console.log("Erro ao deletar reserva", error);
            })
          }
        }
      ]
    });

    alert.present();
  }

  updateReservation(reservation: Reserva) {
    console.log(reservation);
    let encapsular: any = JSON.stringify(new Encapsular(JSON.stringify(this.login), JSON.stringify(reservation), ""));
    let modal = this.modalCtrl.create(ReservationModal,
      {encapsular:encapsular});

    modal.onDidDismiss( () => {
      if (this.callLoadMyReservations()) {
        this.confirmationAlert();
      }
    });
    modal.present();
  }

  createReservation() {
    let modal = this.modalCtrl.create(ReservationModal);

    modal.onDidDismiss( () => {
      this.callLoadMyReservations();
    });
    modal.present();
  }
}