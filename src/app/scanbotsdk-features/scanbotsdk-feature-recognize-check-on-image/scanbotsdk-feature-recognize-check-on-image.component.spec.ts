import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ScanbotsdkFeatureRecognizeCheckOnImageComponent } from './scanbotsdk-feature-recognize-check-on-image.component';

describe('ScanbotsdkFeatureRecognizeCheckOnImageComponent', () => {
    let component: ScanbotsdkFeatureRecognizeCheckOnImageComponent;
    let fixture: ComponentFixture<ScanbotsdkFeatureRecognizeCheckOnImageComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [ScanbotsdkFeatureRecognizeCheckOnImageComponent],
            imports: [IonicModule.forRoot()],
        }).compileComponents();

        fixture = TestBed.createComponent(ScanbotsdkFeatureRecognizeCheckOnImageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
