import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewImageDetailsPage } from './view-image-details.page';

describe('ViewImageDetailsPage', () => {
  let component: ViewImageDetailsPage;
  let fixture: ComponentFixture<ViewImageDetailsPage>;

  beforeEach(async () => {
    fixture = TestBed.createComponent(ViewImageDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
