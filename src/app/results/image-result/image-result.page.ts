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
  isLoading = false;
  hasError = false;

  private activatedRoute = inject(ActivatedRoute);

  constructor() {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.updateImageSource(params.get('encodedImageBuffer'));
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

  private updateImageSource(encodedImageBuffer: string | null) {
    this.imageSrc = this.normalizeImageSource(encodedImageBuffer);
    this.hasError = !this.imageSrc;
    this.isLoading = !!this.imageSrc;
  }

  private normalizeImageSource(encodedImageBuffer: string | null): string | null {
    if (!encodedImageBuffer) {
      return null;
    }

    const sanitizedBase64 = encodedImageBuffer.replace(/\s+/g, '');

    if (!sanitizedBase64) {
      return null;
    }

    return `data:image/jpeg;base64,${sanitizedBase64}`;
  }
}
