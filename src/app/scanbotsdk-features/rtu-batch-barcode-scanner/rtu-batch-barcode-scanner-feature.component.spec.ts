import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RtuBatchBarcodeScannerFeature } from './rtu-batch-barcode-scanner-feature.component';

describe('RtuBatchBarcodeScannerFeature', () => {
    let component: RtuBatchBarcodeScannerFeature;
    let fixture: ComponentFixture<RtuBatchBarcodeScannerFeature>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [RtuBatchBarcodeScannerFeature],
            imports: [IonicModule.forRoot()],
        }).compileComponents();

        fixture = TestBed.createComponent(RtuBatchBarcodeScannerFeature);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
