import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { AgmCoreModule } from '@agm/core';

import { HomePageRoutingModule } from './home-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCFxRGUETFgK_7-fvKIN0koS_5T0tT-TCA', 
      libraries: ['places']
    })
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
