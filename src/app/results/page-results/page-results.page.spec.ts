import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PageResultsPage } from './page-results.page';

describe('PageResultsPage', () => {
    let component: PageResultsPage;
    let fixture: ComponentFixture<PageResultsPage>;

    beforeEach(async () => {
        fixture = TestBed.createComponent(PageResultsPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
