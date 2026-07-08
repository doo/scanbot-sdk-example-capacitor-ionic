import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  IonBackButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonImg,
  IonRow,
  IonSpinner,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-image-result',
  templateUrl: './image-result.page.html',
  styleUrls: ['./image-result.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonBackButton,
    IonButtons,
    IonCol,
    IonContent,
    IonGrid,
    IonHeader,
    IonImg,
    IonRow,
    IonSpinner,
    IonText,
    IonTitle,
    IonToolbar,
  ],
})
export class ImageResultPage implements OnInit {
  imageSrc: string | null = null;
  isLoading = true;
  hasError = false;

  private activatedRoute = inject(ActivatedRoute);

  constructor() {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params) => {
      const encodedImageBuffer = params.get('encodedImageBuffer');
      if (encodedImageBuffer) {
        this.imageSrc = `data:image/jpeg;base64,${encodedImageBuffer}`;
      } else {
        this.onImageError();
      }
    });
  }

  onImageLoad() {
    this.isLoading = false;
    this.hasError = false;
  }

  onImageError() {
    this.isLoading = false;
    this.hasError = true;
  }
}
