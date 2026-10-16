import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ImagegalleryPage } from './imagegallery.page';

const routes: Routes = [
  {
    path: '',
    component: ImagegalleryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ImagegalleryPageRoutingModule { }
