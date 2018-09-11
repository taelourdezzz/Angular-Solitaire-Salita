import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderDivisionComponent } from './header-division.component';

describe('HeaderDivisionComponent', () => {
  let component: HeaderDivisionComponent;
  let fixture: ComponentFixture<HeaderDivisionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderDivisionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderDivisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
