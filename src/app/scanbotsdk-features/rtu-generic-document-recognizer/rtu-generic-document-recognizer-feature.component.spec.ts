import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RtuGenericDocumentRecognizerFeature } from './rtu-generic-document-recognizer-feature.component';

describe('RtuGenericDocumentRecognizerFeature', () => {
    let component: RtuGenericDocumentRecognizerFeature;
    let fixture: ComponentFixture<RtuGenericDocumentRecognizerFeature>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [RtuGenericDocumentRecognizerFeature],
            imports: [IonicModule.forRoot()],
        }).compileComponents();

        fixture = TestBed.createComponent(RtuGenericDocumentRecognizerFeature);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
