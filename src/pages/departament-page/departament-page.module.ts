import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DepartamentPage } from './departament-page';

@NgModule({
  declarations: [
    DepartamentPage,
  ],
  imports: [
    IonicPageModule.forChild(DepartamentPage),
  ],
  exports: [
    DepartamentPage
  ]
})
export class DepartamentPageModule {}
