import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RtuDocumentScannerFeature } from './rtu-document-scanner-feature.component';

describe('ScanbotsdkFeatureDocumentScannerComponent', () => {
    let component: RtuDocumentScannerFeature;
    let fixture: ComponentFixture<RtuDocumentScannerFeature>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [RtuDocumentScannerFeature],
            imports: [IonicModule.forRoot()],
        }).compileComponents();

        fixture = TestBed.createComponent(RtuDocumentScannerFeature);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
