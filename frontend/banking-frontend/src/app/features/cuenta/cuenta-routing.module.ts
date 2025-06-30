import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListarCuentasComponent } from './listar-cuentas/listar-cuentas.component';
import { CrearCuentaComponent } from './crear-cuenta/crear-cuenta.component';
import { TransferenciaComponent } from './transferencia/transferencia.component';
import { MovimientosComponent } from './movimientos/movimientos.component';
import { EditarCuentaComponent } from './modales/editar-cuenta/editar-cuenta.component';


const routes: Routes = [
   { path: '', component: ListarCuentasComponent },
  { path: 'crear', component: CrearCuentaComponent },
  { path: 'editar/:id', component: EditarCuentaComponent },
  { path: 'transferencia', component: TransferenciaComponent },
  { path: 'movimientos/:id', component: MovimientosComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CuentaRoutingModule { }
