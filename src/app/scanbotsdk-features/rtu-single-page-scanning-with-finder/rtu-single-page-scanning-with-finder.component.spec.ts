import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RtuSinglePageScanningWithFinderComponent } from './rtu-single-page-scanning-with-finder.component';

describe('RtuSinglePageScanningWithFinderComponent', () => {
  let component: RtuSinglePageScanningWithFinderComponent;
  let fixture: ComponentFixture<RtuSinglePageScanningWithFinderComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RtuSinglePageScanningWithFinderComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RtuSinglePageScanningWithFinderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
