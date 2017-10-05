import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController } from 'ionic-angular';

import { ConnectionService } from '../../providers/connection-service';
import { Reserva } from '../../models/Reserva';
import { Usuario } from '../../models/Usuario';
import { Departamento } from '../../models/Departamento';
import { Disciplina } from '../../models/Disciplina';
import { Sala } from '../../models/Sala';
import { Login } from '../../models/Login';

import * as moment from 'moment';

@IonicPage()
@Component({
  selector: 'page-reservation-modal',
  templateUrl: 'reservation-modal.html',
})
export class ReservationModal {
  reservation: Reserva;
  departaments: Array<Departamento>;
  login: Login;
  user: Usuario = new Usuario();
  disciplines: Array<Disciplina>;
  rooms: Array<Sala>;
  today: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
  private view: ViewController, private connection: ConnectionService,
  private toastCtrl: ToastController) {
    this.callLoadParams();
    this.callLoadDepartament();
    this.callLoadRoom();
    this.callLoadUser();
    this.today = moment().format("YYYY-MM-DD").toString();
    console.log(this.today);
  }

  callLoadToday() {
    this.connection.loadToday()
      .then( (data: any) => {
        this.today = data;
      }, (error) => {
        console.log("Ocorreu um erro ao carregar data atual", error);
      });
  }

  changeDateToString(value: any): string {
    console.log(value);
    return value.year.toString() + '-' + value.month.toString() + '-' + value.day.toString();
  }

  close() {
    console.log(this.reservation.datareserva);
    this.view.dismiss();
  }

  callLoadRoom() {
    //let that = this;
    this.connection.loadRoom()
      .then( (data: Array<Sala>) => {
        this.rooms = data;
      }, (error) => {
        console.log("Ocorreu um erro ao carregar salas", error);
      });
  }

  callLoadDiscipline(id: string) {
    //let that = this;
    this.connection.loadDisciplineById(id)
      .then( (data: Array<Disciplina>) => {
        this.disciplines = data;
      }, (error) => {
        console.log("Ocorreu um erro ao carregar disciplinas", error);
      });
  }

  callLoadUser() {
    //let that = this;
    this.connection.loadUserById(this.login.id)
      .then( (data: Usuario) => {
        this.user = data;
        this.callLoadDiscipline(this.user.id_disciplinas);
      }, (error) => {
        console.log("Ocorreu um erro ao carregar o usuario", error);
      });
  }

  modifyFormatDate(date: string): string {
    let split = date.split('/');
    return split[2] + '-' + split[1] + '-' + split[0];
  }

  callLoadParams() {
    console.log(this.navParams.get('encapsular'));
    let that = this;
    let encapsulate = JSON.parse(this.navParams.get('encapsular'));
    that.login = JSON.parse(encapsulate.campo1)  || {};
    that.reservation = JSON.parse(encapsulate.campo2);
    if (that.reservation.id != -1) {
      that.reservation.datareserva = this.modifyFormatDate(that.reservation.datareserva);
      that.reservation.dataefetuacao = this.modifyFormatDate(that.reservation.dataefetuacao);
    }

  }

  callLoadDepartament() {
    this.connection.loadDepartament()
      .then( (data: Array<Departamento>) => {
        this.departaments = data;
      }, (error) => {
        console.log("Ocorreu um erro ao carregar os Departamentos", error);
      })
  }

  save() {

  }


}
