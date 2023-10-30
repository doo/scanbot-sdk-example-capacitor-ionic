import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DetectBarcodesOnMultipleImagesFeature } from './detect-barcodes-on-multiple-images-feature.component';

describe('DetectBarcodesOnMultipleImagesFeature', () => {
    let component: DetectBarcodesOnMultipleImagesFeature;
    let fixture: ComponentFixture<DetectBarcodesOnMultipleImagesFeature>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [DetectBarcodesOnMultipleImagesFeature],
            imports: [IonicModule.forRoot()],
        }).compileComponents();

        fixture = TestBed.createComponent(DetectBarcodesOnMultipleImagesFeature);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
