import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ScanbotsdkFeatureScanEhicComponent } from './scanbotsdk-feature-scan-ehic.component';

describe('ScanbotsdkFeatureScanEhicComponent', () => {
  let component: ScanbotsdkFeatureScanEhicComponent;
  let fixture: ComponentFixture<ScanbotsdkFeatureScanEhicComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ScanbotsdkFeatureScanEhicComponent],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ScanbotsdkFeatureScanEhicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
