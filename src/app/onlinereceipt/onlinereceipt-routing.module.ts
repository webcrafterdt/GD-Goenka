import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OnlinereceiptPage } from './onlinereceipt.page';

const routes: Routes = [
  {
    path: '',
    component: OnlinereceiptPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OnlinereceiptPageRoutingModule {}
