import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AnalyzeDocumentQualityFeature } from './analyze-document-quality-feature.component';

describe('AnalyzeDocumentQualityFeature', () => {
    let component: AnalyzeDocumentQualityFeature;
    let fixture: ComponentFixture<AnalyzeDocumentQualityFeature>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [AnalyzeDocumentQualityFeature],
            imports: [IonicModule.forRoot()],
        }).compileComponents();

        fixture = TestBed.createComponent(AnalyzeDocumentQualityFeature);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
