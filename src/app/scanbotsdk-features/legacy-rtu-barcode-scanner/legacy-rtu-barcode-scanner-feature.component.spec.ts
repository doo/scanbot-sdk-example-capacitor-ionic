import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LegacyRtuBarcodeScannerFeature } from './legacy-rtu-barcode-scanner-feature.component';

describe('ScanbotsdkLegacyFeatureScanBarcodesComponent', () => {
    let component: LegacyRtuBarcodeScannerFeature;
    let fixture: ComponentFixture<LegacyRtuBarcodeScannerFeature>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [LegacyRtuBarcodeScannerFeature],
            imports: [IonicModule.forRoot()],
        }).compileComponents();

        fixture = TestBed.createComponent(LegacyRtuBarcodeScannerFeature);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
