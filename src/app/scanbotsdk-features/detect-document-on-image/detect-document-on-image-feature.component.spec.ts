import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DetectDocumentOnImageFeature } from './detect-document-on-image-feature.component';

describe('DetectDocumentOnImageFeature', () => {
    let component: DetectDocumentOnImageFeature;
    let fixture: ComponentFixture<DetectDocumentOnImageFeature>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [DetectDocumentOnImageFeature],
            imports: [IonicModule.forRoot()],
        }).compileComponents();

        fixture = TestBed.createComponent(DetectDocumentOnImageFeature);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
