import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilepicPageRoutingModule } from './profilepic-routing.module';

import { ProfilepicPage } from './profilepic.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfilepicPageRoutingModule
  ],
  declarations: [ProfilepicPage]
})
export class ProfilepicPageModule {}
