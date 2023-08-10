import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MrzScannerPage } from './mrz-scanner.page';

describe('MrzScannerPage', () => {
  let component: MrzScannerPage;
  let fixture: ComponentFixture<MrzScannerPage>;

  beforeEach(async () => {
    fixture = TestBed.createComponent(MrzScannerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
