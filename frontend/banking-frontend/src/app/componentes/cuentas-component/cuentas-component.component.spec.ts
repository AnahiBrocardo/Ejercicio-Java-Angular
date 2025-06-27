import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CuentasComponentComponent } from './cuentas-bancarias.component';

describe('CuentasComponentComponent', () => {
  let component: CuentasComponentComponent;
  let fixture: ComponentFixture<CuentasComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CuentasComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CuentasComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
