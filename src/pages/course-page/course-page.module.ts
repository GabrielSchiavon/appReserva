import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CoursePage } from './course-page';

@NgModule({
  declarations: [
    CoursePage,
  ],
  imports: [
    IonicPageModule.forChild(CoursePage),
  ],
  exports: [
    CoursePage
  ]
})
export class CoursePageModule {}
