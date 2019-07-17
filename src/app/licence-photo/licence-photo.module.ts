import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { LicencePhotoPage } from './licence-photo.page';

const routes: Routes = [
  {
    path: '',
    component: LicencePhotoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [LicencePhotoPage]
})
export class LicencePhotoPageModule {}
