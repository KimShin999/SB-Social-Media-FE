import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutFakeComponent } from './layout-fake.component';

describe('LayoutFakeComponent', () => {
  let component: LayoutFakeComponent;
  let fixture: ComponentFixture<LayoutFakeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LayoutFakeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutFakeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
