import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { CoursePage } from '../pages/course-page/course-page';
import { DepartamentPage } from '../pages/departament-page/departament-page';
import { RoomPage } from '../pages/room-page/room-page';
import { UserPage } from '../pages/user-page/user-page';
import { AcademicYearPage } from '../pages/academic-year-page/academic-year-page';
import { DisciplinePage } from '../pages/discipline-page/discipline-page';
import { MainPage } from '../pages/main-page/main-page';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = MainPage;

  pagesDocente: Array<{title: string, component: any}>;
  pagesSecretaria: Array<{title: string, component: any}>;
  pagesAdminDpto: Array<{title: string, component: any}>;
  pagesAdminSistema: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar,
    public splashScreen: SplashScreen, private menuCtrl: MenuController) {
      this.initializeApp();

    // used for an example of ngFor and navigation
    this.pagesDocente = [
      { title: 'Reservas', component: HomePage },
      { title: 'Logout', component: MainPage},
    ];

    this.pagesSecretaria = [
      { title: 'Reservas', component: HomePage },
      { title: 'Disciplinas', component: DisciplinePage},
      { title: 'Salas', component: RoomPage},
      { title: 'Logout', component: MainPage}
    ];

    this.pagesAdminDpto = [
      { title: 'Reservas', component: HomePage },
      { title: 'Disciplinas', component: DisciplinePage},
      { title: 'Usuários', component: UserPage},
      { title: 'Salas', component: RoomPage},
      { title: 'Logout', component: MainPage}
    ];

    this.pagesAdminSistema = [
      { title: 'Reservas', component: HomePage },
      { title: 'Disciplinas', component: DisciplinePage},
      { title: 'Usuários', component: UserPage},
      { title: 'Salas', component: RoomPage},
      { title: 'Cursos', component: CoursePage},
      { title: 'Ano Letivo', component: AcademicYearPage},
      { title: 'Departamentos', component: DepartamentPage},
      { title: 'Logout', component: MainPage}
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
