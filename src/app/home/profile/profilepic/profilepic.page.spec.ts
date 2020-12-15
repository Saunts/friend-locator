import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProfilepicPage } from './profilepic.page';

describe('ProfilepicPage', () => {
  let component: ProfilepicPage;
  let fixture: ComponentFixture<ProfilepicPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfilepicPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProfilepicPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
