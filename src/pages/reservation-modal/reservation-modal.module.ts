import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReservationModal } from './reservation-modal';

@NgModule({
  declarations: [
    ReservationModal,
  ],
  imports: [
    IonicPageModule.forChild(ReservationModal),
  ],
  exports: [
    ReservationModal
  ]
})
export class ReservationModalModule {}
