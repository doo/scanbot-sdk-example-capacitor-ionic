import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RecognizeGenericDocumentOnImageFeature } from './recognize-generic-document-on-image-feature.component';

describe('RecognizeGenericDocumentOnImageFeature', () => {
    let component: RecognizeGenericDocumentOnImageFeature;
    let fixture: ComponentFixture<RecognizeGenericDocumentOnImageFeature>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [RecognizeGenericDocumentOnImageFeature],
            imports: [IonicModule.forRoot()],
        }).compileComponents();

        fixture = TestBed.createComponent(RecognizeGenericDocumentOnImageFeature);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
