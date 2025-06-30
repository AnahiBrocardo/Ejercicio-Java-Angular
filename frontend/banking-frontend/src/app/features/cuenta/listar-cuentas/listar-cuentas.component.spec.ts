import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarCuentasComponent } from './listar-cuentas.component';

describe('ListarCuentasComponent', () => {
  let component: ListarCuentasComponent;
  let fixture: ComponentFixture<ListarCuentasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarCuentasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarCuentasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
