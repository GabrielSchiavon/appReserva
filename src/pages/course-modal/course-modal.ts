import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController } from 'ionic-angular';

import { ConnectionService } from '../../providers/connection-service';
import { Curso } from '../../models/Curso';
import { Departamento } from '../../models/Departamento';
import { Encapsular } from '../../models/Encapsular';
import { Login } from '../../models/Login';

@IonicPage()
@Component({
  selector: 'page-course-modal',
  templateUrl: 'course-modal.html',
})
export class CourseModal {
  course: Curso;
  departaments: Array<Departamento>;
  private login: Login = new Login(1, "admin", "admin", 4);

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private view: ViewController, private connection: ConnectionService,
    private toastCtrl: ToastController) {
      this.callLoadDepartament();
      this.course = this.navParams.get('course') || {};
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
    let encapsulate = new Encapsular(JSON.stringify(this.login), JSON.stringify(this.course), "");
    if (this.course.id != undefined) {
      this.connection.updateCourse(encapsulate)
        .then( (resp) => {
          if (resp) {
            this.confirmationAlert();
            this.view.dismiss();
          }
        }, (error) => {
          console.log('Erro ao atualizar curso', error);
        } );

    } else {
      this.connection.insertCourse(encapsulate)
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
