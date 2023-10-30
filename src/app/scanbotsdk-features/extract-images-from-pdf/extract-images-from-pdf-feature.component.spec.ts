import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExtractImagesFromPdfFeature } from './extract-images-from-pdf-feature.component';

describe('ScanbotsdkFeatureImagesFromPdfComponent', () => {
    let component: ExtractImagesFromPdfFeature;
    let fixture: ComponentFixture<ExtractImagesFromPdfFeature>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [ExtractImagesFromPdfFeature],
            imports: [IonicModule.forRoot()],
        }).compileComponents();

        fixture = TestBed.createComponent(ExtractImagesFromPdfFeature);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
