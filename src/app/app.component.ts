import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login-page/login-page';
import { CoursePage } from '../pages/course-page/course-page';
import { DepartamentPage } from '../pages/departament-page/departament-page';
import { RoomPage } from '../pages/room-page/room-page';
import { UserPage } from '../pages/user-page/user-page';
import { AcademicYearPage } from '../pages/academic-year-page/academic-year-page';
import { DisciplinePage } from '../pages/discipline-page/discipline-page';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'List', component: ListPage },
      { title: 'Login', component: LoginPage},
      { title: 'Cursos', component: CoursePage},
      { title: 'Departamentos', component: DepartamentPage},
      { title: 'Salas', component: RoomPage},
      { title: 'Usuarios', component: UserPage},
      { title: 'Ano Letivo', component: AcademicYearPage},
      { title: 'Disciplinas', component: DisciplinePage}
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
