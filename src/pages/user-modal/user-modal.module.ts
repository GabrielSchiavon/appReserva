import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserModal } from './user-modal';

@NgModule({
  declarations: [
    UserModal,
  ],
  imports: [
    IonicPageModule.forChild(UserModal),
  ],
  exports: [
    UserModal
  ]
})
export class UserModalModule {}
