import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExtractPagesFromPdfFeature } from './extract-pages-from-pdf-feature.component';

describe('ExtractPagesFromPdfFeature', () => {
    let component: ExtractPagesFromPdfFeature;
    let fixture: ComponentFixture<ExtractPagesFromPdfFeature>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [ExtractPagesFromPdfFeature],
            imports: [IonicModule.forRoot()],
        }).compileComponents();

        fixture = TestBed.createComponent(ExtractPagesFromPdfFeature);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
