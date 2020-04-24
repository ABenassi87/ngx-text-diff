import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SideBySideTableComponent } from './side-by-side-table.component';

describe('SideBySideTableComponent', () => {
  let component: SideBySideTableComponent;
  let fixture: ComponentFixture<SideBySideTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SideBySideTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SideBySideTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
