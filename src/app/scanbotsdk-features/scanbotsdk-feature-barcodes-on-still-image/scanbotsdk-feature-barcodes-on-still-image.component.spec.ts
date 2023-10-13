import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ScanbotsdkFeatureBarcodesOnStillImageComponent } from './scanbotsdk-feature-barcodes-on-still-image.component';

describe('ScanbotsdkFeatureBarcodesOnStillImageComponent', () => {
  let component: ScanbotsdkFeatureBarcodesOnStillImageComponent;
  let fixture: ComponentFixture<ScanbotsdkFeatureBarcodesOnStillImageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ScanbotsdkFeatureBarcodesOnStillImageComponent],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ScanbotsdkFeatureBarcodesOnStillImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
