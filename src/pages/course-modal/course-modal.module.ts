import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CourseModal } from './course-modal';

@NgModule({
  declarations: [
    CourseModal,
  ],
  imports: [
    IonicPageModule.forChild(CourseModal),
  ],
  exports: [
    CourseModal
  ]
})
export class CourseModalModule {}
