import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Capacitor } from '@capacitor/core';

@Component({
  selector: 'app-image-preview',
  templateUrl: './image-preview.component.html',
  styleUrls: ['./image-preview.component.scss']
})
export class ImagePreviewComponent implements OnInit {
  originalImageUri: string = "";
  imageUrl: string | ArrayBuffer | null = null;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const imageFileUri = params.get('imageFileUri');
      if (imageFileUri) {
        this.originalImageUri = imageFileUri;
        this.imageUrl = Capacitor.convertFileSrc(imageFileUri);
      }
    });
  }

  dismiss() {
    this.router.navigate(['/mainpage'])
  }
}