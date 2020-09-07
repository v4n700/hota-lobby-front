import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileDashboardChartComponent } from './profile-dashboard-chart.component';

describe('ProfileDashboardChartComponent', () => {
  let component: ProfileDashboardChartComponent;
  let fixture: ComponentFixture<ProfileDashboardChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileDashboardChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileDashboardChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
