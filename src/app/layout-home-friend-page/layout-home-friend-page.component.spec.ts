import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutHomeFriendPageComponent } from './layout-home-friend-page.component';

describe('LayoutHomeFriendPageComponent', () => {
  let component: LayoutHomeFriendPageComponent;
  let fixture: ComponentFixture<LayoutHomeFriendPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LayoutHomeFriendPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutHomeFriendPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
