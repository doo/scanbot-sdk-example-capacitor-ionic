import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BarcodeDocumentFormatsPage } from './barcode-document-formats.page';

describe('BarcodeDocumentFormatsPage', () => {
  let component: BarcodeDocumentFormatsPage;
  let fixture: ComponentFixture<BarcodeDocumentFormatsPage>;

  beforeEach(async () => {
    fixture = TestBed.createComponent(BarcodeDocumentFormatsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
