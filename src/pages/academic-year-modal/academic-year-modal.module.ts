import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AcademicYearModal } from './academic-year-modal';

@NgModule({
  declarations: [
    AcademicYearModal,
  ],
  imports: [
    IonicPageModule.forChild(AcademicYearModal),
  ],
  exports: [
    AcademicYearModal
  ]
})
export class AcademicYearModalModule {}
