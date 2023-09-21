import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MainpagePageRoutingModule } from './mainpage-routing.module';

import { MainpagePage } from './mainpage.page';
import { StringSelectorModule } from '../string-selector-modal/string-selector-module.module';
import { ImagePreviewModule } from '../image-preview/image-preview.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MainpagePageRoutingModule,
    StringSelectorModule,
    ImagePreviewModule
  ],
  declarations: [MainpagePage]
})
export class MainpagePageModule {}
