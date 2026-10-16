import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddimagemodalPage } from './addimagemodal.page';

const routes: Routes = [
  {
    path: '',
    component: AddimagemodalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddimagemodalPageRoutingModule {}
