import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TransferenciaComponent } from '../modales/transferencia/transferencia.component';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cuenta-page',
  templateUrl: './cuenta-page.component.html',
  styleUrls: ['./cuenta-page.component.css']
})
export class CuentaPageComponent implements OnInit {
  mostrarMovimientos = false;
  idCuenta!: string;

  constructor(private route: ActivatedRoute, private dialog: MatDialog, private router: Router
  ) { }

  ngOnInit(): void {
    this.idCuenta = this.route.snapshot.paramMap.get('id')!;
  }

  irATransferencia() {
    const dialogRef = this.dialog.open(TransferenciaComponent, {
      width: '500px',
      data: {
        cuentaOrigenId: this.idCuenta
      }
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }


  handleError(error: any): void {
    let mensaje = 'Ocurrió un error inesperado.';
    if (error.status === 404) mensaje = 'No se encontraron resultados.';
    else if (error.status === 500) mensaje = 'Error del servidor.';
    else if (error.error?.message) mensaje = error.error.message;
    Swal.fire('Error', mensaje, 'error');
  }

  volverALista(){
  this.router.navigateByUrl('');
  }
}
