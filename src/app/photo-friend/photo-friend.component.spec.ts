import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoFriendComponent } from './photo-friend.component';

describe('PhotoFriendComponent', () => {
  let component: PhotoFriendComponent;
  let fixture: ComponentFixture<PhotoFriendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhotoFriendComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotoFriendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
