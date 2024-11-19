import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DocumentResultPage } from './document-result.page';

describe('DocumentResultPage', () => {
  let component: DocumentResultPage;
  let fixture: ComponentFixture<DocumentResultPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentResultPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
