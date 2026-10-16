import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddcircularPage } from './addcircular.page';

const routes: Routes = [
  {
    path: '',
    component: AddcircularPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddcircularPageRoutingModule {}
