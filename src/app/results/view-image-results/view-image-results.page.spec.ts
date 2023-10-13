import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewImageResultsPage } from './view-image-results.page';

describe('ViewImageResultsPage', () => {
  let component: ViewImageResultsPage;
  let fixture: ComponentFixture<ViewImageResultsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ViewImageResultsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
