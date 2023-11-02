import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RecognizeCheckOnImageFeature } from './recognize-check-on-image-feature.component';

describe('RecognizeCheckOnImageFeature', () => {
    let component: RecognizeCheckOnImageFeature;
    let fixture: ComponentFixture<RecognizeCheckOnImageFeature>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [RecognizeCheckOnImageFeature],
            imports: [IonicModule.forRoot()],
        }).compileComponents();

        fixture = TestBed.createComponent(RecognizeCheckOnImageFeature);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
