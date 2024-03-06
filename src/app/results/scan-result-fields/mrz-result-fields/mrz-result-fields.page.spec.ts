import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MrzResultFieldsPage } from './mrz-result-fields.page';

describe('MrzResultFieldsPage', () => {
  let component: MrzResultFieldsPage;
  let fixture: ComponentFixture<MrzResultFieldsPage>;

  beforeEach(async () => {
    fixture = TestBed.createComponent(MrzResultFieldsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
