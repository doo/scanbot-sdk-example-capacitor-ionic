import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RtuHealthInsuranceCardScannerFeature } from './rtu-health-insurance-card-scanner-feature.component';

describe('RtuHealthInsuranceCardScannerFeature', () => {
    let component: RtuHealthInsuranceCardScannerFeature;
    let fixture: ComponentFixture<RtuHealthInsuranceCardScannerFeature>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [RtuHealthInsuranceCardScannerFeature],
            imports: [IonicModule.forRoot()],
        }).compileComponents();

        fixture = TestBed.createComponent(RtuHealthInsuranceCardScannerFeature);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
