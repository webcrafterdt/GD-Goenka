import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ArticlemanagerPage } from './articlemanager.page';

const routes: Routes = [
  {
    path: '',
    component: ArticlemanagerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArticlemanagerPageRoutingModule {}
