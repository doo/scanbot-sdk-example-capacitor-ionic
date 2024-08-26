import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PageDetailsPage } from './page-details.page';

describe('PageDetailsPage', () => {
    let component: PageDetailsPage;
    let fixture: ComponentFixture<PageDetailsPage>;

    beforeEach(async () => {
        fixture = TestBed.createComponent(PageDetailsPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
