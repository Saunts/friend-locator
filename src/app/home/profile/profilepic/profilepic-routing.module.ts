import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfilepicPage } from './profilepic.page';

const routes: Routes = [
  {
    path: '',
    component: ProfilepicPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfilepicPageRoutingModule {}
