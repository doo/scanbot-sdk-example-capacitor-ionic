import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RtuFindAndPickBarcodeScanningFeatureComponent } from './rtu-find-and-pick-barcode-scanning-feature.component';

describe('RtuFindAndPickBarcodeScanningFeatureComponent', () => {
  let component: RtuFindAndPickBarcodeScanningFeatureComponent;
  let fixture: ComponentFixture<RtuFindAndPickBarcodeScanningFeatureComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [RtuFindAndPickBarcodeScanningFeatureComponent],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(RtuFindAndPickBarcodeScanningFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
