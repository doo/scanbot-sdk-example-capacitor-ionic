import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TextDataScannerPage } from './text-data-scanner.page';

describe('TextDataScannerPage', () => {
  let component: TextDataScannerPage;
  let fixture: ComponentFixture<TextDataScannerPage>;

  beforeEach(async () => {
    fixture = TestBed.createComponent(TextDataScannerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
