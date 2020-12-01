import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoverFriendComponent } from './cover-friend.component';

describe('CoverFriendComponent', () => {
  let component: CoverFriendComponent;
  let fixture: ComponentFixture<CoverFriendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoverFriendComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoverFriendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
