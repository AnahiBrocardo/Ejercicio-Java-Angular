import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListarCuentasComponent } from './components/cuenta/listar-cuentas/listar-cuentas.component';


const routes: Routes = [
  { path: '', component: ListarCuentasComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
