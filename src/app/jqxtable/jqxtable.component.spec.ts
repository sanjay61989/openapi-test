import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JqxtableComponent } from './jqxtable.component';

describe('JqxtableComponent', () => {
  let component: JqxtableComponent;
  let fixture: ComponentFixture<JqxtableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JqxtableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JqxtableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
