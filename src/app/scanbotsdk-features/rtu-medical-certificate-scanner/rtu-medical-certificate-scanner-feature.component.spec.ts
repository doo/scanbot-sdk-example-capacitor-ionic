import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RtuMedicalCertificateScannerFeature } from './rtu-medical-certificate-scanner-feature.component';

describe('RtuMedicalCertificateScannerFeature', () => {
    let component: RtuMedicalCertificateScannerFeature;
    let fixture: ComponentFixture<RtuMedicalCertificateScannerFeature>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [RtuMedicalCertificateScannerFeature],
            imports: [IonicModule.forRoot()],
        }).compileComponents();

        fixture = TestBed.createComponent(RtuMedicalCertificateScannerFeature);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
