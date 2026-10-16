import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ImagemanagerPage } from './imagemanager.page';

const routes: Routes = [
  {
    path: '',
    component: ImagemanagerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ImagemanagerPageRoutingModule {}
