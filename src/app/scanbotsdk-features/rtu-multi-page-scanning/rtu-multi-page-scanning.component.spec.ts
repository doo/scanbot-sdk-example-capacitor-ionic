import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RtuMultiPageScanningComponent } from './rtu-multi-page-scanning.component';

describe('RtuMultiPageScanningComponent', () => {
  let component: RtuMultiPageScanningComponent;
  let fixture: ComponentFixture<RtuMultiPageScanningComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RtuMultiPageScanningComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RtuMultiPageScanningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
