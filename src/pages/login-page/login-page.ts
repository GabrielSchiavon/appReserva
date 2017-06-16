import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ConnectionService } from '../../providers/connection-service';
import { Login } from '../../models/Login';

@IonicPage()
@Component({
  selector: 'page-login-page',
  templateUrl: 'login-page.html',
})
export class LoginPage {
  private userField: string = "";
  private passField: string = "";
  private login: Login;

  constructor(public navCtrl: NavController, private connection: ConnectionService,
     public navParams: NavParams) {
       this.login = new Login();
  }

  callLogin() : void {
    this.login.setEmail(this.userField);
    this.login.setSenha(this.passField);

    this.connection.confirmarLogin(this.login.getEmail().trim(), this.login.getSenha().trim())
    .then( (res) =>
      {
        console.log(res);
      })
    .catch( (err) =>
      {
        console.log(err);
      });
  }

}
