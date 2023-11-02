import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CheckResultFieldsPage } from './check-result-fields.page';

describe('CheckResultFieldsPage', () => {
    let component: CheckResultFieldsPage;
    let fixture: ComponentFixture<CheckResultFieldsPage>;

    beforeEach(async () => {
        fixture = TestBed.createComponent(CheckResultFieldsPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
