import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxTextDiffComponent } from './ngx-text-diff.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoaderSppinerComponent } from './loader-sppiner/loader-sppiner.component';
import { FormatLinePipe } from './format-line.pipe';

describe('NgxTextDiffComponent', () => {
  let component: NgxTextDiffComponent;
  let fixture: ComponentFixture<NgxTextDiffComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, CommonModule],
      declarations: [NgxTextDiffComponent, LoaderSppinerComponent, FormatLinePipe]
    }).compileComponents();
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
