import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RoomModal } from './room-modal';

@NgModule({
  declarations: [
    RoomModal,
  ],
  imports: [
    IonicPageModule.forChild(RoomModal),
  ],
  exports: [
    RoomModal
  ]
})
export class RoomModalModule {}
