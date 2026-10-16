import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SociallinkPage } from './sociallink.page';

const routes: Routes = [
  {
    path: '',
    component: SociallinkPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SociallinkPageRoutingModule {}
