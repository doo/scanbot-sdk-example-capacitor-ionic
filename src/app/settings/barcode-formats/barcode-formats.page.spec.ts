import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BarcodeFormatsPage } from './barcode-formats.page';

describe('BarcodeFormatsPage', () => {
    let component: BarcodeFormatsPage;
    let fixture: ComponentFixture<BarcodeFormatsPage>;

    beforeEach(async () => {
        fixture = TestBed.createComponent(BarcodeFormatsPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
