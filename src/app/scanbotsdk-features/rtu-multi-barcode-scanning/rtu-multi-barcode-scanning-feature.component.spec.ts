import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RtuMultiBarcodeScanningFeatureComponent } from './rtu-multi-barcode-scanning-feature.component';

describe('RtuMultiBarcodeScanningFeatureComponent', () => {
  let component: RtuMultiBarcodeScanningFeatureComponent;
  let fixture: ComponentFixture<RtuMultiBarcodeScanningFeatureComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [RtuMultiBarcodeScanningFeatureComponent],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(RtuMultiBarcodeScanningFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
