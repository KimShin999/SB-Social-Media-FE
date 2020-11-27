import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LayoutRegisterPageComponent} from './layout-register-page.component';

describe('LayoutRegisterPageComponent', () => {
  let component: LayoutRegisterPageComponent;
  let fixture: ComponentFixture<LayoutRegisterPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LayoutRegisterPageComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutRegisterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
