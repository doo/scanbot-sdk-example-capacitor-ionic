import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ScanbotsdkFeaturePagesFromPdfComponent } from './scanbotsdk-feature-pages-from-pdf.component';

describe('ScanbotsdkFeaturePagesFromPdfComponent', () => {
    let component: ScanbotsdkFeaturePagesFromPdfComponent;
    let fixture: ComponentFixture<ScanbotsdkFeaturePagesFromPdfComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [ScanbotsdkFeaturePagesFromPdfComponent],
            imports: [IonicModule.forRoot()],
        }).compileComponents();

        fixture = TestBed.createComponent(ScanbotsdkFeaturePagesFromPdfComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
