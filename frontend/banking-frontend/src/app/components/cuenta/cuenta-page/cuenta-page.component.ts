import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TransferenciaComponent } from '../transferencia/transferencia.component';
import { MatDialog } from '@angular/material/dialog';
import { MovimientoService } from 'src/app/servicios/movimiento/movimiento.service';
import Swal from 'sweetalert2';
import { CuentaService } from 'src/app/servicios/cuenta/cuenta.service';

@Component({
  selector: 'app-cuenta-page',
  templateUrl: './cuenta-page.component.html',
  styleUrls: ['./cuenta-page.component.css']
})
export class CuentaPageComponent implements OnInit {
  mostrarMovimientos = false;
  idCuenta!: string;

  constructor(private route: ActivatedRoute, private dialog: MatDialog, private router: Router,
    private movimientoService: MovimientoService,
    private cuentaService: CuentaService
  ) { }

  ngOnInit(): void {
    this.idCuenta = this.route.snapshot.paramMap.get('id')!;
    this.recargarCuenta();
  }

  irATransferencia() {
    const dialogRef = this.dialog.open(TransferenciaComponent, {
      data: {
        cuentaOrigenId: this.idCuenta
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.movimientoService.crearTransferencia(result).subscribe({
          next: (movimiento) => {
            Swal.fire('Éxito', 'Transferencia realizada con éxito.', 'success');
            dialogRef.close('transferencia-realizada');
          },
          error: (err) => {
            let mensaje = 'Ocurrió un error al procesar la transferencia.';
            if (err.status === 400) {
              mensaje = 'Datos inválidos.';
            } else if (err.status === 500) {
              mensaje = 'Error del servidor. Intente más tarde.';
            } else if (err.error?.message) {
              mensaje = err.error.message;
            }
            Swal.fire('Error', mensaje, 'error');
          }
        });
      }
    });
    dialogRef.afterClosed().subscribe(resultado => {
      if (resultado === 'transferencia-realizada') {
        window.location.reload();
      }
    });
  }


    recargarCuenta() {
    this.cuentaService.getCuentaPorId(this.idCuenta).subscribe({
      next: cuenta => {
        this.idCuenta = cuenta.id;
      },
      error: err => this.handleError(err)
    });
  }

  handleError(error: any): void {
    let mensaje = 'Ocurrió un error inesperado.';
    if (error.status === 404) mensaje = 'No se encontraron resultados.';
    else if (error.status === 500) mensaje = 'Error del servidor.';
    else if (error.error?.message) mensaje = error.error.message;
    Swal.fire('Error', mensaje, 'error');
  }
}
