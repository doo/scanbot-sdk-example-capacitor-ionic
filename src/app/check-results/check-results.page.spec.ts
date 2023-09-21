import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CheckResultsPage } from './check-results.page';

describe('CheckResultsPage', () => {
  let component: CheckResultsPage;
  let fixture: ComponentFixture<CheckResultsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CheckResultsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
