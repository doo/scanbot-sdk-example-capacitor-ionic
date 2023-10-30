import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ScanbotsdkFeatureDocumentFromPageComponent } from './scanbotsdk-feature-document-from-page.component';

describe('ScanbotsdkFeatureDocumentFromPageComponent', () => {
    let component: ScanbotsdkFeatureDocumentFromPageComponent;
    let fixture: ComponentFixture<ScanbotsdkFeatureDocumentFromPageComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [ScanbotsdkFeatureDocumentFromPageComponent],
            imports: [IonicModule.forRoot()],
        }).compileComponents();

        fixture = TestBed.createComponent(ScanbotsdkFeatureDocumentFromPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
