import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideBySideContainerComponent } from './side-by-side-container.component';

describe('SideBySideContainerComponent', () => {
  let component: SideBySideContainerComponent;
  let fixture: ComponentFixture<SideBySideContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SideBySideContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SideBySideContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
