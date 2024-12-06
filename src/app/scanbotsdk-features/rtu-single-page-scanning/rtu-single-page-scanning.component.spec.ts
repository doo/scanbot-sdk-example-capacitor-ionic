import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RtuSinglePageScanningComponent } from './rtu-single-page-scanning.component';

describe('RtuSinglePageScanningComponent', () => {
  let component: RtuSinglePageScanningComponent;
  let fixture: ComponentFixture<RtuSinglePageScanningComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RtuSinglePageScanningComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RtuSinglePageScanningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
