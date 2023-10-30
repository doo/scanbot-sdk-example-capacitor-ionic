import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ScanbotsdkFeatureBarcodesOnStillImagesComponent } from './scanbotsdk-feature-barcodes-on-still-images.component';

describe('ScanbotsdkFeatureBarcodesOnStillImagesComponent', () => {
    let component: ScanbotsdkFeatureBarcodesOnStillImagesComponent;
    let fixture: ComponentFixture<ScanbotsdkFeatureBarcodesOnStillImagesComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [ScanbotsdkFeatureBarcodesOnStillImagesComponent],
            imports: [IonicModule.forRoot()],
        }).compileComponents();

        fixture = TestBed.createComponent(ScanbotsdkFeatureBarcodesOnStillImagesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
