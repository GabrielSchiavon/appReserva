import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DepartamentModal } from './departament-modal';

@NgModule({
  declarations: [
    DepartamentModal,
  ],
  imports: [
    IonicPageModule.forChild(DepartamentModal),
  ],
  exports: [
    DepartamentModal
  ]
})
export class DepartamentModalModule {}
