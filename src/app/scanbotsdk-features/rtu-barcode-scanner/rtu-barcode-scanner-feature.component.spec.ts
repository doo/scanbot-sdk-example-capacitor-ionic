import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RtuBarcodeScannerFeature } from './rtu-barcode-scanner-feature.component';

describe('ScanbotsdkFeatureScanBarcodesComponent', () => {
    let component: RtuBarcodeScannerFeature;
    let fixture: ComponentFixture<RtuBarcodeScannerFeature>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [RtuBarcodeScannerFeature],
            imports: [IonicModule.forRoot()],
        }).compileComponents();

        fixture = TestBed.createComponent(RtuBarcodeScannerFeature);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
