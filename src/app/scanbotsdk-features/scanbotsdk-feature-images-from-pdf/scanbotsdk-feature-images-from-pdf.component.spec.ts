import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ScanbotsdkFeatureImagesFromPdfComponent } from './scanbotsdk-feature-images-from-pdf.component';

describe('ScanbotsdkFeatureImagesFromPdfComponent', () => {
    let component: ScanbotsdkFeatureImagesFromPdfComponent;
    let fixture: ComponentFixture<ScanbotsdkFeatureImagesFromPdfComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [ScanbotsdkFeatureImagesFromPdfComponent],
            imports: [IonicModule.forRoot()],
        }).compileComponents();

        fixture = TestBed.createComponent(ScanbotsdkFeatureImagesFromPdfComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
