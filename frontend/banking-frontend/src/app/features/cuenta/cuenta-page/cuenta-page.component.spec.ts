import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CuentaPageComponent } from './cuenta-page.component';

describe('CuentaPageComponent', () => {
  let component: CuentaPageComponent;
  let fixture: ComponentFixture<CuentaPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CuentaPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CuentaPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
