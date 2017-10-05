import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController  } from 'ionic-angular';

import { ConnectionService } from '../../providers/connection-service';
import { Login } from '../../models/Login';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-login-page',
  templateUrl: 'login-page.html',
})
export class LoginPage {
  private login: Login;

  constructor(public navCtrl: NavController, private connection: ConnectionService,
     public navParams: NavParams, private loadingCtrl: LoadingController, private alertCtrl: AlertController) {
       this.login = new Login();
  }

  dismissPage() {
    this.navCtrl.pop();
  }

  showErrorAuthenticated() {
    let alert = this.alertCtrl.create({
      title: 'Tente novamente',
      subTitle: 'Email ou Senha incorreto(s)!',
      buttons: ['OK']
    });
    alert.present();
  }

  callLogin() {
    var that = this;
    let loading = this.loadingCtrl.create({content:"Verificando Dados..."});
    loading.present();
    this.connection.confirmarLogin(this.login.email.trim().toLowerCase(), this.login.senha.trim())
      .then( (data: Login) => {
        that.login = data;
        loading.dismiss();
        if(that.login.id == -1) {
          this.showErrorAuthenticated();
        } else {
          this.navCtrl.setRoot(HomePage, {login: that.login});
        }
      }, (error) => {
        console.log("Ocorreu um erro ao carregar Login", error);
        loading.dismiss();
        this.showErrorAuthenticated();
      });
    console.log(that.login);
  }

}
