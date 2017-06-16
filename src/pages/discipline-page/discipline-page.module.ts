import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DisciplinePage } from './discipline-page';

@NgModule({
  declarations: [
    DisciplinePage,
  ],
  imports: [
    IonicPageModule.forChild(DisciplinePage),
  ],
  exports: [
    DisciplinePage
  ]
})
export class DisciplinePageModule {}
