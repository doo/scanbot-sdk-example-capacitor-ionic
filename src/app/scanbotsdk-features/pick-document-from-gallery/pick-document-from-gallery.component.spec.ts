import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PickDocumentFromGalleryComponent } from './pick-document-from-gallery.component';

describe('PickDocumentFromGalleryComponent', () => {
  let component: PickDocumentFromGalleryComponent;
  let fixture: ComponentFixture<PickDocumentFromGalleryComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [PickDocumentFromGalleryComponent],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PickDocumentFromGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
