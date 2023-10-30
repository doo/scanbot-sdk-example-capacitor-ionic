import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ScanbotsdkFeatureDocumentScannerWithFinderComponent } from './scanbotsdk-feature-document-scanner-with-finder.component';

describe('ScanbotsdkFeatureDocumentScannerWithFinderComponent', () => {
    let component: ScanbotsdkFeatureDocumentScannerWithFinderComponent;
    let fixture: ComponentFixture<ScanbotsdkFeatureDocumentScannerWithFinderComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [ScanbotsdkFeatureDocumentScannerWithFinderComponent],
            imports: [IonicModule.forRoot()],
        }).compileComponents();

        fixture = TestBed.createComponent(ScanbotsdkFeatureDocumentScannerWithFinderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
