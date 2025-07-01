import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CuentaRoutingModule } from './cuenta-routing.module';
import { ListarCuentasComponent } from './listar-cuentas/listar-cuentas.component';
import { CrearCuentaComponent } from './crear-cuenta/crear-cuenta.component';
import { TransferenciaComponent } from './modales/transferencia/transferencia.component';
import { MovimientosComponent } from './movimientos/movimientos.component';
import { DetalleCuentaComponent } from './detalle-cuenta/detalle-cuenta.component';
import { EditarCuentaComponent } from './modales/editar-cuenta/editar-cuenta.component';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { CuentaPageComponent } from 'src/app/components/cuenta/cuenta-page/cuenta-page.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    ListarCuentasComponent,
    CrearCuentaComponent,
    TransferenciaComponent,
    MovimientosComponent,
    DetalleCuentaComponent,
    EditarCuentaComponent,
    CuentaPageComponent
  ],
  imports: [
    CommonModule,
    CuentaRoutingModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatExpansionModule,
    MatSelectModule,
  ]
})
export class CuentaModule { }
