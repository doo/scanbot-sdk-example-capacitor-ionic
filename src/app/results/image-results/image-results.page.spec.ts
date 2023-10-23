import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ImageResultsPage } from './image-results.page';

describe('ImageResultsPage', () => {
  let component: ImageResultsPage;
  let fixture: ComponentFixture<ImageResultsPage>;

  beforeEach(async () => {
    fixture = TestBed.createComponent(ImageResultsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
