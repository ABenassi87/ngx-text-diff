import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineByLineContainerComponent } from './line-by-line-container.component';

describe('LineByLineContainerComponent', () => {
  let component: LineByLineContainerComponent;
  let fixture: ComponentFixture<LineByLineContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LineByLineContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LineByLineContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
