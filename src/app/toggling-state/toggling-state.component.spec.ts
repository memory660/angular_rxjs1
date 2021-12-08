import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TogglingStateComponent } from './toggling-state.component';

describe('TogglingStateComponent', () => {
  let component: TogglingStateComponent;
  let fixture: ComponentFixture<TogglingStateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TogglingStateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TogglingStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
