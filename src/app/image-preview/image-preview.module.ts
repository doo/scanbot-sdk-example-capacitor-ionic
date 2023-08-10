import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagePreviewComponent } from './image-preview.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [
    ImagePreviewComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    ImagePreviewComponent
  ]
})
export class ImagePreviewModule { }
