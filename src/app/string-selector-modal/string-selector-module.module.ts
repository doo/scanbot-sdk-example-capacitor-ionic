import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { StringSelectorModalComponent } from './string-selector-modal.component';

@NgModule({
  declarations: [
    StringSelectorModalComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    StringSelectorModalComponent,
  ],
})
export class StringSelectorModule { }
