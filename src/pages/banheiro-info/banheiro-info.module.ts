import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BanheiroInfoPage } from './banheiro-info';

@NgModule({
  declarations: [
    BanheiroInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(BanheiroInfoPage),
  ],
})
export class BanheiroInfoPageModule {}
