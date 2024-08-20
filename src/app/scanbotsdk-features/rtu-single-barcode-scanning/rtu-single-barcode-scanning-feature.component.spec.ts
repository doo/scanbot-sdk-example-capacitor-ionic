import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RtuSingleBarcodeScanningFeatureComponent } from './rtu-single-barcode-scanning-feature.component';

describe('RtuSingleBarcodeScanningFeatureComponent', () => {
  let component: RtuSingleBarcodeScanningFeatureComponent;
  let fixture: ComponentFixture<RtuSingleBarcodeScanningFeatureComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [RtuSingleBarcodeScanningFeatureComponent],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(RtuSingleBarcodeScanningFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
