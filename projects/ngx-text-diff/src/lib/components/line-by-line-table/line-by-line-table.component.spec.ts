import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LineByLineTableComponent } from './line-by-line-table.component';

describe('LineByLineTableComponent', () => {
  let component: LineByLineTableComponent;
  let fixture: ComponentFixture<LineByLineTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LineByLineTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LineByLineTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
