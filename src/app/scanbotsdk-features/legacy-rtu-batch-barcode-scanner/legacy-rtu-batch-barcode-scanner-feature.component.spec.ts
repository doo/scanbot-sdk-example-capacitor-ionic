import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LegacyRtuBatchBarcodeScannerFeature } from './legacy-rtu-batch-barcode-scanner-feature.component';

describe('LegacyRtuBatchBarcodeScannerFeature', () => {
    let component: LegacyRtuBatchBarcodeScannerFeature;
    let fixture: ComponentFixture<LegacyRtuBatchBarcodeScannerFeature>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [LegacyRtuBatchBarcodeScannerFeature],
            imports: [IonicModule.forRoot()],
        }).compileComponents();

        fixture = TestBed.createComponent(LegacyRtuBatchBarcodeScannerFeature);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
