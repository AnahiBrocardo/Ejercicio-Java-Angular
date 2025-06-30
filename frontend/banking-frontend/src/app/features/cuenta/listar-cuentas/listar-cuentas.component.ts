import { Component, OnInit } from '@angular/core';
import { CuentaBancaria } from 'src/app/modelos/cuentaBancaria.model';
import { CuentaService } from 'src/app/servicios/cuenta/cuenta.service';
import { MatDialog } from '@angular/material/dialog';
import { DetalleCuentaComponent } from '../modales/detalle-cuenta/detalle-cuenta.component';
import { EditarCuentaComponent } from '../modales/editar-cuenta/editar-cuenta.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-cuentas',
  templateUrl: './listar-cuentas.component.html',
  styleUrls: ['./listar-cuentas.component.css']
})
export class ListarCuentasComponent implements OnInit {

  cuentas: CuentaBancaria[]= [];
  columnas: string[]=  ['orden', 'nombre','apellido', 'numeroCuenta', 'acciones'];

  constructor(private cuentaService: CuentaService, private dialog: MatDialog) { }

  ngOnInit(): void {
   this.obtenerCuentas();
  }

  obtenerCuentas(): void{
    this.cuentaService.getCuentas().subscribe({
      next: (data)=>{
      this.cuentas= data;
      },
      error:(err)=>{
       this.handleError(err);
      }
    })
  }

  verDetalle(cuenta: CuentaBancaria) {
  this.dialog.open(DetalleCuentaComponent, {
    data: cuenta
  });
}

 editarCuenta(cuenta: CuentaBancaria) {
  const dialogRef = this.dialog.open(EditarCuentaComponent, {
    data: cuenta
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result === 'actualizado') {
      this.obtenerCuentas(); 
    }
  });
}

eliminarCuenta(cuenta: CuentaBancaria) {
 Swal.fire({
    title: '¿Estás seguro?',
    text: `Vas a eliminar la cuenta de ${cuenta.nombre} ${cuenta.apellido}`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      this.cuentaService.eliminarCuenta(cuenta.id!).subscribe({
        next: () => {
          Swal.fire('Eliminado', 'La cuenta bancaria ha sido eliminada correctamente', 'success');
          this.obtenerCuentas(); 
        },
        error: (err) => {
         error: (err) => this.handleError(err);
        }
      });
    }
  });
}

handleError(error: any): void {
  let mensaje = 'Ocurrió un error inesperado. Intente nuevamente.';

  if (error.status === 0) {
    mensaje = 'No se pudo conectar con el servidor.';
  } else if (error.status === 404) {
    mensaje = 'No se encontraron resultados.';
  } else if (error.status === 500) {
    mensaje = 'Error del servidor. Intente más tarde.';
  } else if (error.error?.message) {
    mensaje = error.error.message;
  }

  console.error('Error:', error);
  Swal.fire('Error', mensaje, 'error');
}


}
