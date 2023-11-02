import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MedicalCertificateResultFieldsPage } from './medical-certificate-result-fields.page';

describe('MedicalCertificateResultFieldsPage', () => {
    let component: MedicalCertificateResultFieldsPage;
    let fixture: ComponentFixture<MedicalCertificateResultFieldsPage>;

    beforeEach(async () => {
        fixture = TestBed.createComponent(MedicalCertificateResultFieldsPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
