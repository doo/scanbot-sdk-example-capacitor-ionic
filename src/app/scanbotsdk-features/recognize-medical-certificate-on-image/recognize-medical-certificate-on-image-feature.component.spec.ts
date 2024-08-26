import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RecognizeMedicalCertificateOnImageFeature } from './recognize-medical-certificate-on-image-feature.component';

describe('RecognizeMedicalCertificateOnImageFeature', () => {
    let component: RecognizeMedicalCertificateOnImageFeature;
    let fixture: ComponentFixture<RecognizeMedicalCertificateOnImageFeature>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [RecognizeMedicalCertificateOnImageFeature],
            imports: [IonicModule.forRoot()],
        }).compileComponents();

        fixture = TestBed.createComponent(RecognizeMedicalCertificateOnImageFeature);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
