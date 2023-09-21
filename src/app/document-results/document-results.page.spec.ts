import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DocumentResultsPage } from './document-results.page';

describe('DocumentResultsPage', () => {
	let component: DocumentResultsPage;
	let fixture: ComponentFixture<DocumentResultsPage>;

	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
			declarations: [DocumentResultsPage],
			imports: [IonicModule.forRoot()]
		}).compileComponents();

		fixture = TestBed.createComponent(DocumentResultsPage);
		component = fixture.componentInstance;
		fixture.detectChanges();
	}));

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
