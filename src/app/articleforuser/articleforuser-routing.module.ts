import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ArticleforuserPage } from './articleforuser.page';

const routes: Routes = [
  {
    path: '',
    component: ArticleforuserPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArticleforuserPageRoutingModule { }
