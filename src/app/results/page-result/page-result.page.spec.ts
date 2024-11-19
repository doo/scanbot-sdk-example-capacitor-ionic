import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PageResultPage } from './page-result.page';

describe('PageResultPage', () => {
  let component: PageResultPage;
  let fixture: ComponentFixture<PageResultPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PageResultPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
