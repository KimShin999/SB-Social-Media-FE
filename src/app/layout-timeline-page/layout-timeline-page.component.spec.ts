import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LayoutTimelinePageComponent} from './layout-timeline-page.component';

describe('LayoutTimelinePageComponent', () => {
  let component: LayoutTimelinePageComponent;
  let fixture: ComponentFixture<LayoutTimelinePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LayoutTimelinePageComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutTimelinePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
