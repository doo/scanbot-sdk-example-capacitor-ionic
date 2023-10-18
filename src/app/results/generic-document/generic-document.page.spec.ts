import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GenericDocumentPage } from './generic-document.page';

describe('GenericDocumentPage', () => {
  let component: GenericDocumentPage;
  let fixture: ComponentFixture<GenericDocumentPage>;

  beforeEach(async () => {
    fixture = TestBed.createComponent(GenericDocumentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
