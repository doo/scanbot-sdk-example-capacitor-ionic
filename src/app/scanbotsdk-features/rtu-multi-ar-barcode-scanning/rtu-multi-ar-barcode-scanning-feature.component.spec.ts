import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RtuMultiArBarcodeScanningFeatureComponent } from './rtu-multi-ar-barcode-scanning-feature.component';

describe('RtuMultiArBarcodeScanningFeatureComponent', () => {
  let component: RtuMultiArBarcodeScanningFeatureComponent;
  let fixture: ComponentFixture<RtuMultiArBarcodeScanningFeatureComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [RtuMultiArBarcodeScanningFeatureComponent],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(RtuMultiArBarcodeScanningFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
