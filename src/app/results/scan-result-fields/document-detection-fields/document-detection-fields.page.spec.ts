import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DocumentDetectionFieldsPage } from './document-detection-fields.page';

describe('DocumentDetectionFieldsPage', () => {
    let component: DocumentDetectionFieldsPage;
    let fixture: ComponentFixture<DocumentDetectionFieldsPage>;

    beforeEach(async () => {
        fixture = TestBed.createComponent(DocumentDetectionFieldsPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
