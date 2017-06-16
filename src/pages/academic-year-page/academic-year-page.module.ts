import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AcademicYearPage } from './academic-year-page';

@NgModule({
  declarations: [
    AcademicYearPage,
  ],
  imports: [
    IonicPageModule.forChild(AcademicYearPage),
  ],
  exports: [
    AcademicYearPage
  ]
})
export class AcademicYearPageModule {}
