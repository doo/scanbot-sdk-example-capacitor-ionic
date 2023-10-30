import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ScanbotsdkFeatureScanMedicalCertComponent } from './scanbotsdk-feature-scan-medical-cert.component';

describe('ScanbotsdkFeatureScanMedicalCertComponent', () => {
    let component: ScanbotsdkFeatureScanMedicalCertComponent;
    let fixture: ComponentFixture<ScanbotsdkFeatureScanMedicalCertComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [ScanbotsdkFeatureScanMedicalCertComponent],
            imports: [IonicModule.forRoot()],
        }).compileComponents();

        fixture = TestBed.createComponent(ScanbotsdkFeatureScanMedicalCertComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
