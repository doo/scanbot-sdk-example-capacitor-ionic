import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LegacyBarcodeResultFieldsPage } from './legacy-barcode-result-fields.page';

describe('LegacyBarcodeResultFieldsPage', () => {
    let component: LegacyBarcodeResultFieldsPage;
    let fixture: ComponentFixture<LegacyBarcodeResultFieldsPage>;

    beforeEach(async () => {
        fixture = TestBed.createComponent(LegacyBarcodeResultFieldsPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
