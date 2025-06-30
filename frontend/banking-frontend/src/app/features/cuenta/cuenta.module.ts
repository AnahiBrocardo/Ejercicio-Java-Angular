import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CuentaRoutingModule } from './cuenta-routing.module';
import { ListarCuentasComponent } from './listar-cuentas/listar-cuentas.component';
import { CrearCuentaComponent } from './crear-cuenta/crear-cuenta.component';
import { TransferenciaComponent } from './transferencia/transferencia.component';
import { MovimientosComponent } from './movimientos/movimientos.component';


@NgModule({
  declarations: [ListarCuentasComponent, CrearCuentaComponent, TransferenciaComponent, MovimientosComponent],
  imports: [
    CommonModule,
    CuentaRoutingModule
  ]
})
export class CuentaModule { }
