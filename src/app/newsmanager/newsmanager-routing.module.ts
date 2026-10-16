import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewsmanagerPage } from './newsmanager.page';

const routes: Routes = [
  {
    path: '',
    component: NewsmanagerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewsmanagerPageRoutingModule {}
