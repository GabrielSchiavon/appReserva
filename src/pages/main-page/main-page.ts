import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ConnectionService } from '../../providers/connection-service';
import { LoginPage } from '../../pages/login-page/login-page';

import { Reserva } from '../../models/Reserva';
import { Departamento } from '../../models/Departamento';
import { Usuario } from '../../models/Usuario';
import { Sala } from '../../models/Sala';
import * as moment from 'moment';

@IonicPage()
@Component({
  selector: 'page-main-page',
  templateUrl: 'main-page.html',
})
export class MainPage {
  today = moment().format("YYYY-MM-DD").toString();
  actual = this.today;
  rooms: Array<Sala>;
  departaments: Array<Departamento>;
  users: Array<Usuario>;
  allReservations: Array<Reserva>;
  reservations: Array<Reserva>;
  departamentId: number;
  roomsNumber: Array<Number>;
  currentRoom:Sala;
  posRoom: number;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public connection: ConnectionService) {
      this.posRoom = 0;
      this.departamentId = 1;
      this.allReservations = [];
      this.reservations = [];
      this.rooms = [];
      this.currentRoom = new Sala();
      this.callLoadDepartament();
      this.callLoadUser();
  }

  filterByIdRoom() {
    this.reservations = this.allReservations.filter(res => res.idsala == this.currentRoom.id);
    console.log(this.reservations);
  }

  callLoadReservationToday(day: string){
    return this.connection.loadReservationToday(day, this.departamentId)
      .then( (data: Array<Reserva>) => {
        this.allReservations = data;
        this.filterByIdRoom();
      }, (error) => {
        console.log("Ocorreu um erro ao carregar os usuarios", error);
      });
  }

  callLoadUser() {
    return this.connection.loadUser()
      .then( (data: Array<Usuario>) => {
        this.users = data;
      }, (error) => {
        console.log("Ocorreu um erro ao carregar os usuarios", error);
      });
  }

  changeDateToString(value: any): string {
    return value.year.toString() + '-' + value.month.toString() + '-' + value.day.toString();
  }

  callLoadDepartament() {
    return this.connection.loadDepartament()
      .then( (data: Array<Departamento>) => {
        this.departaments = data;
        this.callLoadRoom();
      }, (error) => {
        console.log("Ocorreu um erro ao carregar os departamentos", error);
      });
  }

  callLoadRoom() {
    return this.connection.loadRoom()
      .then( (data: Array<Sala>) => {
        if (data.length != 0) {
          this.rooms = data;
          this.currentRoom = data[this.posRoom];
          this.callLoadReservationToday(this.actual);
        }
      }, (error) => {
        console.log("Ocorreu um erro ao carregar as Salas", error);
      });
  }

  callLoginPage() {
    this.navCtrl.push(LoginPage);
  }

  backRoom(){
    if (this.posRoom > 0) {
      this.posRoom -= 1;
    } else {
      this.posRoom = this.rooms.length-1;
    }
    this.currentRoom = this.rooms[this.posRoom];
    this.filterByIdRoom();
  }

  nextRoom(){
    if (this.posRoom < (this.rooms.length-1)) {
      this.posRoom += 1;
    } else {
      this.posRoom = 0;
    }
    this.currentRoom = this.rooms[this.posRoom];
    this.filterByIdRoom();
  }

}
