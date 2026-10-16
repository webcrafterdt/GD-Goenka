import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ImageforuserPage } from './imageforuser.page';

const routes: Routes = [
  {
    path: '',
    component: ImageforuserPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ImageforuserPageRoutingModule {}
