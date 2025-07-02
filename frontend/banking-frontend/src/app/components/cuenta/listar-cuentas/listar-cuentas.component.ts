import { Component, OnInit } from '@angular/core';
import { CuentaBancaria } from 'src/app/interfaces/cuentaBancaria.model';
import { CuentaService } from 'src/app/servicios/cuenta/cuenta.service';
import { MatDialog } from '@angular/material/dialog';
import { EditarCuentaComponent } from '../modales/editar-cuenta/editar-cuenta.component';
import Swal from 'sweetalert2';
import { CrearCuentaComponent } from '../crear-cuenta/crear-cuenta.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-cuentas',
  templateUrl: './listar-cuentas.component.html',
  styleUrls: ['./listar-cuentas.component.css']
})
export class ListarCuentasComponent implements OnInit {

  cuentas: CuentaBancaria[] = [];
  columnas: string[] = ['orden', 'nombre', 'apellido', 'numeroCuenta', 'acciones'];

  constructor(private cuentaService: CuentaService,
    private router: Router, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.obtenerCuentas();

    this.cuentaService.onCuentaActualizada().subscribe(() => {
      this.obtenerCuentas();
    });
  }

  obtenerCuentas(): void {
    this.cuentaService.getCuentas().subscribe({
      next: (data) => {
        this.cuentas = data;
      },
      error: (err) => {
        this.handleError(err);
      }
    })
  }

  verDetalle(cuenta: CuentaBancaria) {
    this.router.navigate(['/cuenta', cuenta.id]);
  }

  editarCuenta(cuenta: CuentaBancaria) {
    const dialogRef = this.dialog.open(EditarCuentaComponent, {
      data: cuenta
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cuentaService.actualizarSaldo(result).subscribe({
          next: () => {
            Swal.fire('Cuenta actualizada correctamente', '', 'success');
            this.obtenerCuentas();
          },
          error: (err) => this.handleError(err)
        });
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
          error: (err) => this.handleError(err) 
        });
      }
    });
  }

  crearCuenta() {
    const dialogRef = this.dialog.open(CrearCuentaComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const cuentaParaCrear = { nombre: result.nombre, apellido: result.apellido };
        this.cuentaService.crearCuenta(cuentaParaCrear).subscribe({
          next: () => {
            Swal.fire('La cuenta bancaria ha sido creada correctamente', 'success');
            this.obtenerCuentas();
          },
         error: (err) => this.handleError(err)
        })
      }
    });
  }

  handleError(error: any): void {
    let mensaje = 'Ocurrió un error inesperado. Intente nuevamente.';

    if (error.status === 404) {
      mensaje = 'No se encontraron resultados.';
    } else if (error.status === 500) {
      mensaje = 'Error del servidor. Intente más tarde.';
    } else if (error.error?.message) {
      mensaje = error.error.message;
    }

    Swal.fire('Error', mensaje, 'error');
  }


}
