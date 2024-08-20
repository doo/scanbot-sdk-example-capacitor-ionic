import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RecognizeEhicOnImageFeature } from './recognize-ehic-on-image-feature.component';

describe('RecognizeEhicOnImageFeature', () => {
    let component: RecognizeEhicOnImageFeature;
    let fixture: ComponentFixture<RecognizeEhicOnImageFeature>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [RecognizeEhicOnImageFeature],
            imports: [IonicModule.forRoot()],
        }).compileComponents();

        fixture = TestBed.createComponent(RecognizeEhicOnImageFeature);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
