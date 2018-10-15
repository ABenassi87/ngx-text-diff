import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxTextDiffComponent } from './ngx-text-diff.component';

describe('NgxTextDiffComponent', () => {
  let component: NgxTextDiffComponent;
  let fixture: ComponentFixture<NgxTextDiffComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxTextDiffComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxTextDiffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
