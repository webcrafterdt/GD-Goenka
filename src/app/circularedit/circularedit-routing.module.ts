import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CirculareditPage } from './circularedit.page';

const routes: Routes = [
  {
    path: '',
    component: CirculareditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CirculareditPageRoutingModule {}
