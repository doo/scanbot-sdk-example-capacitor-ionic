import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ScanbotsdkFeatureScanLicensePlateComponent } from './scanbotsdk-feature-scan-license-plate.component';

describe('ScanbotsdkFeatureScanLicensePlateComponent', () => {
  let component: ScanbotsdkFeatureScanLicensePlateComponent;
  let fixture: ComponentFixture<ScanbotsdkFeatureScanLicensePlateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ScanbotsdkFeatureScanLicensePlateComponent],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ScanbotsdkFeatureScanLicensePlateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
