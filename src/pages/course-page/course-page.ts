import { Component } from '@angular/core';
import { NavController, AlertController, ModalController, ToastController, IonicPage  } from 'ionic-angular';

import { ConnectionService } from '../../providers/connection-service';
import { CourseModal } from './../course-modal/course-modal';

import { Curso } from '../../models/Curso';
import { Encapsular } from '../../models/Encapsular';
import { Login } from '../../models/Login';

@IonicPage()
@Component({
  selector: 'page-course-page',
  templateUrl: 'course-page.html',
})
export class CoursePage {
  private courses: Array<Curso>;
  private login: Login = new Login(1, "admin", "admin", 4);

  constructor(public navCtrl: NavController, private connection: ConnectionService,
    private alert: AlertController, private modalCtrl: ModalController,
    private toastCtrl: ToastController) {
      this.callLoadCourse();
  }

  confirmationAlert() {
    let toast = this.toastCtrl.create({
      message: 'Operação realizada com sucesso!',
      duration: 1500
    });
    toast.present();
  }

  callLoadCourse() {
    this.connection.loadCourse()
      .then( (data: Array<Curso>) => {
        this.courses = data;
      }, (error) => {
        console.log("Ocorreu um erro", error);
      })
  }

  removeCourse(course: Curso) {
    let alert = this.alert.create({
      title: 'Deletar Curso ?',
      message: 'Deseja realmente deletar o curso \'' + course.nome + '\'?',
      buttons: [
        {text: 'Cancelar'},
        {
          text: 'Deletar',
        handler: (data) => {
          let encapsular: any = new Encapsular(JSON.stringify(this.login), JSON.stringify(course), "");
          this.connection.removeCourse(encapsular)
            .then( (resp) => {
              this.confirmationAlert();
              this.callLoadCourse()
            }, (error) => {
              console.log("Erro ao deletar curso", error);
            })
          }
        }
      ]
    });

    alert.present();
  }

  updateCourse(course: Curso) {
    console.log(course);
    let modal = this.modalCtrl.create(CourseModal, {course: course});

    modal.onDidDismiss( () => {
      if (this.callLoadCourse()) {
        this.confirmationAlert();
      }
    });
    modal.present();
  }

  createCourse() {
    let modal = this.modalCtrl.create(CourseModal);

    modal.onDidDismiss( () => {
      this.callLoadCourse();
    });
    modal.present();
  }

}
