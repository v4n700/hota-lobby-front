import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProfileInfoComponent } from './profile-info.component';

describe('ProfileInfoComponent', () => {
  let component: ProfileInfoComponent;
  let fixture: ComponentFixture<ProfileInfoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
