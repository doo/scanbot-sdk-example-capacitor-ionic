import {
  afterEveryRender,
  afterNextRender,
  Component,
  inject,
  NgZone,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import {
  barcodeOutline,
  cameraReverseOutline,
  flashlightOutline,
  listOutline,
  copyOutline,
  scanOutline,
} from 'ionicons/icons';
import { Capacitor } from '@capacitor/core';
import {
  AspectRatio,
  CustomUIFinderConfiguration,
  DocumentCustomUIComponent,
  DocumentCustomUIPolygonConfiguration,
  DocumentDetectionStatus,
  EdgeInsets,
  ScanbotDocument,
  ScannerViewFrame,
  DocumentDetectionResult,
  ImageRef,
  type SBError,
} from 'capacitor-plugin-scanbot-sdk';

@Component({
  selector: 'app-document-custom-ui',
  templateUrl: './document-custom-ui.page.html',
  styleUrls: ['./document-custom-ui.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonButton,
    IonIcon,
    IonText,
  ],
})
export class DocumentCustomUiPage implements OnInit {
  documentCustomUI = new DocumentCustomUIComponent();
  frameDetectionResult: DocumentDetectionStatus = 'NOT_ACQUIRED';
  private router = inject(Router);
  private currentPosition: ScannerViewFrame = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  };
  private flashEnabled = false;
  private finderEnabled = false;
  private polygonEnabled = true;

  constructor(private ngZone: NgZone) {
    addIcons({
      cameraReverseOutline,
      flashlightOutline,
      listOutline,
      barcodeOutline,
      copyOutline,
      scanOutline,
    });

    if (Capacitor.isPluginAvailable('ScanbotCustomUI')) {
      afterNextRender(async () => {
        this.documentCustomUI.attachScannerAtFrame(
          { ...this.extractRect() },
          {
            onSnappedDocumentResult: async (
              originalImage: ImageRef,
              documentImage?: ImageRef,
              detectionResult?: DocumentDetectionResult,
            ) => {
              await this.documentCustomUI.detachScannerView();
              let images = [originalImage];
              if (documentImage) {
                images.push(documentImage);
              }
              const documentResult = await ScanbotDocument.createDocumentFromImages({
                images: images,
              });
              await this.router.navigate(['/document-result', documentResult.uuid]);
            },
            onFrameDetectionResult: (detectionResult: DocumentDetectionStatus) => {
              this.ngZone.run(() => {
                this.frameDetectionResult = detectionResult;
              });
            },
            onError: (error: SBError) => {
              alert(error);
            },
          },
        );
        this.currentPosition = this.extractRect();
      });

      afterEveryRender(() => {
        const current = this.extractRect();
        if (this.hasMoved(current, this.currentPosition)) {
          this.documentCustomUI.updateScannerViewFrame({ ...this.extractRect(), sendToBack: true });
          this.currentPosition = current;
        }
      });
    }
  }

  ngOnInit(): void {}

  ngOnDestroy() {
    this.documentCustomUI.detachScannerView();
  }

  onFinderToggle() {
    this.finderEnabled = !this.finderEnabled;
    const finderConfiguration: CustomUIFinderConfiguration = {
      viewFinderEnabled: this.finderEnabled,
      finderLineWidth: 4.0,
      finderLineColor: '#ff00ff',
      finderOverlayColor: '#000000',
      finderInset: new EdgeInsets({ top: 16.0, left: 16.0, bottom: 16.0, right: 16.0 }),
      finderMinimumPadding: 0,
      finderAspectRatio: new AspectRatio({ width: 1, height: 1.4 }),
    };

    this.documentCustomUI.configuration.setFinderConfiguration(finderConfiguration);
  }

  onFlashEnabled() {
    this.flashEnabled = !this.flashEnabled;
    this.documentCustomUI.configuration.setCameraConfiguration({
      flashEnabled: this.flashEnabled,
    });
  }

  onPolygonToggle() {
    this.polygonEnabled = !this.polygonEnabled;

    const polygonConfiguration: DocumentCustomUIPolygonConfiguration = {
      polygonEnabled: this.polygonEnabled,
      polygonBackgroundColor: '#ff0000',
      polygonBackgroundColorOK: '#ff00ff',
      polygonColor: '#ffffff',
      polygonColorOK: '#ffffff',
      polygonLineWidth: 3.0,
      polygonCornerRadius: 8.0,
      polygonAutoSnapProgressColor: '#00ff00',
      polygonAutoSnapProgressLineWidth: 6.0,
      polygonAutoSnapProgressEnabled: true,
    };

    this.documentCustomUI.configuration.setPolygonConfiguration(polygonConfiguration);
  }

  onSnap() {
    this.documentCustomUI.snapDocument();
  }

  private extractRect(): ScannerViewFrame {
    const div = document.getElementById('document-view');
    if (!div) {
      return {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
      };
    }
    const rect = div.getBoundingClientRect();
    return {
      x: rect.x,
      y: rect.y,
      width: rect.width,
      height: rect.height,
      sendToBack: true,
    };
  }

  private hasMoved(current: ScannerViewFrame, lastPosition: ScannerViewFrame) {
    return (
      current.x !== lastPosition.x ||
      current.y !== lastPosition.y ||
      current.width !== lastPosition.width ||
      current.height !== lastPosition.height
    );
  }
}
