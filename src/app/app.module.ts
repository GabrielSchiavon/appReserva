import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login-page/login-page';
import { CoursePage } from '../pages/course-page/course-page';
import { CourseModal} from '../pages/course-modal/course-modal';
import { DepartamentPage} from '../pages/departament-page/departament-page';
import { DepartamentModal} from '../pages/departament-modal/departament-modal';
import { RoomPage} from '../pages/room-page/room-page';
import { RoomModal} from '../pages/room-modal/room-modal';
import { UserPage} from '../pages/user-page/user-page';
import { UserModal} from '../pages/user-modal/user-modal';
import { AcademicYearPage } from '../pages/academic-year-page/academic-year-page';
import { AcademicYearModal } from '../pages/academic-year-modal/academic-year-modal';
import { ReservationModal } from '../pages/reservation-modal/reservation-modal';
import { DisciplinePage } from '../pages/discipline-page/discipline-page';
import { DisciplineModal } from '../pages/discipline-modal/discipline-modal';

import { ConnectionService } from '../providers/connection-service';
import { HttpModule } from '@angular/http';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    CoursePage,
    CourseModal,
    DepartamentPage,
    DepartamentModal,
    RoomPage,
    RoomModal,
    UserPage,
    UserModal,
    AcademicYearPage,
    AcademicYearModal,
    ReservationModal,
    DisciplinePage,
    DisciplineModal
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    CoursePage,
    CourseModal,
    DepartamentPage,
    DepartamentModal,
    RoomPage,
    RoomModal,
    UserPage,
    UserModal,
    AcademicYearPage,
    AcademicYearModal,
    ReservationModal,
    DisciplinePage,
    DisciplineModal
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ConnectionService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
