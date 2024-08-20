import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EHICResultFieldsPage } from './ehic-result-fields.page';

describe('EHICResultFieldsPage', () => {
    let component: EHICResultFieldsPage;
    let fixture: ComponentFixture<EHICResultFieldsPage>;

    beforeEach(async () => {
        fixture = TestBed.createComponent(EHICResultFieldsPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
