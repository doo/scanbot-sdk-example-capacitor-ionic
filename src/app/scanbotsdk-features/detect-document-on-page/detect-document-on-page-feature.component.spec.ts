import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DetectDocumentOnPageFeature } from './detect-document-on-page-feature.component';

describe('DetectDocumentOnPageFeature', () => {
    let component: DetectDocumentOnPageFeature;
    let fixture: ComponentFixture<DetectDocumentOnPageFeature>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [DetectDocumentOnPageFeature],
            imports: [IonicModule.forRoot()],
        }).compileComponents();

        fixture = TestBed.createComponent(DetectDocumentOnPageFeature);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
