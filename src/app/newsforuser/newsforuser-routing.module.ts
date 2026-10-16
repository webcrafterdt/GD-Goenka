import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewsforuserPage } from './newsforuser.page';

const routes: Routes = [
  {
    path: '',
    component: NewsforuserPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewsforuserPageRoutingModule {}
