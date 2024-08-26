import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BarcodeResultFieldsPage } from './barcode-result-fields.page';

describe('BarcodeResultFieldsPage', () => {
    let component: BarcodeResultFieldsPage;
    let fixture: ComponentFixture<BarcodeResultFieldsPage>;

    beforeEach(async () => {
        fixture = TestBed.createComponent(BarcodeResultFieldsPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
