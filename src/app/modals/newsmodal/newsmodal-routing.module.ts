import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewsmodalPage } from './newsmodal.page';

const routes: Routes = [
  {
    path: '',
    component: NewsmodalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewsmodalPageRoutingModule {}
