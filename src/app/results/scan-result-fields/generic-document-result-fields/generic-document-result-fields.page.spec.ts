import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GenericDocumentResultFieldsPage } from './generic-document-result-fields.page';

describe('GenericDocumentResultFieldsPage', () => {
    let component: GenericDocumentResultFieldsPage;
    let fixture: ComponentFixture<GenericDocumentResultFieldsPage>;

    beforeEach(async () => {
        fixture = TestBed.createComponent(GenericDocumentResultFieldsPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
