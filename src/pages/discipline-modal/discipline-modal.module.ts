import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DisciplineModal } from './discipline-modal';

@NgModule({
  declarations: [
    DisciplineModal,
  ],
  imports: [
    IonicPageModule.forChild(DisciplineModal),
  ],
  exports: [
    DisciplineModal
  ]
})
export class DisciplineModalModule {}
