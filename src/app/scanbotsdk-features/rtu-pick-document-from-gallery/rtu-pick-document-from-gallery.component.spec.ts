import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RtuPickDocumentFromGalleryComponent } from './rtu-pick-document-from-gallery.component';

describe('RtuPickDocumentFromGalleryComponent', () => {
  let component: RtuPickDocumentFromGalleryComponent;
  let fixture: ComponentFixture<RtuPickDocumentFromGalleryComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RtuPickDocumentFromGalleryComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RtuPickDocumentFromGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
