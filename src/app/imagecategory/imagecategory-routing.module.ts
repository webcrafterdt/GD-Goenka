import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ImagecategoryPage } from './imagecategory.page';

const routes: Routes = [
  {
    path: '',
    component: ImagecategoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ImagecategoryPageRoutingModule { }
