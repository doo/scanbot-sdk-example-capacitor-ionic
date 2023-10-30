import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ScanResultFieldsPage } from './scan-result-fields.page';

describe('ScanResultFieldsPage', () => {
    let component: ScanResultFieldsPage;
    let fixture: ComponentFixture<ScanResultFieldsPage>;

    beforeEach(async () => {
        fixture = TestBed.createComponent(ScanResultFieldsPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
