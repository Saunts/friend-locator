import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FriendListPage } from './friend-list.page';

const routes: Routes = [
  {
    path: '',
    component: FriendListPage
  },
  {
    path: 'addfriend',
    loadChildren: () => import('./add-friend/add-friend.module').then( m => m.AddFriendPageModule)
  },
  {
    path: 'home',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'profile',
    redirectTo: '/home/profile',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FriendListPageRoutingModule {}
