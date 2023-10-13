import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ScanbotsdkFeatureDocumentFromImageComponent } from './scanbotsdk-feature-document-from-image.component';

describe('ScanbotsdkFeatureDocumentFromImageComponent', () => {
  let component: ScanbotsdkFeatureDocumentFromImageComponent;
  let fixture: ComponentFixture<ScanbotsdkFeatureDocumentFromImageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ScanbotsdkFeatureDocumentFromImageComponent],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ScanbotsdkFeatureDocumentFromImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
