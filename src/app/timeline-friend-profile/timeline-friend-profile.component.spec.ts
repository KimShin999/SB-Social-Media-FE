import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelineFriendProfileComponent } from './timeline-friend-profile.component';

describe('TimelineFriendProfileComponent', () => {
  let component: TimelineFriendProfileComponent;
  let fixture: ComponentFixture<TimelineFriendProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimelineFriendProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimelineFriendProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
