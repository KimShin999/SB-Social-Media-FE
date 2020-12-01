import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendOfFriendComponent } from './friend-of-friend.component';

describe('FriendOfFriendComponent', () => {
  let component: FriendOfFriendComponent;
  let fixture: ComponentFixture<FriendOfFriendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FriendOfFriendComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendOfFriendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
