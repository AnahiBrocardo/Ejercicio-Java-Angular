import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovimientoDTO } from 'src/app/interfaces/movimiento.model';
import { MovimientoService } from 'src/app/servicios/movimiento/movimiento.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-movimientos',
  templateUrl: './movimientos.component.html',
  styleUrls: ['./movimientos.component.css']
})
export class MovimientosComponent implements OnInit {

  idCuenta!: string;
  movimientos: MovimientoDTO[] = [];
  displayedColumns: string[] = ['fecha', 'contraparte', 'monto', 'tipo'];

  constructor(private route: ActivatedRoute, private movimientoService: MovimientoService) { }

  ngOnInit(): void {
    this.idCuenta = this.route.parent?.snapshot.paramMap.get('id')!;
    this.movimientoService.getMovimientoPorId(this.idCuenta).subscribe({
      next: (data) => this.movimientos = data,
      error: (err) => {
        let mensaje;
        if (err.status === 500) {
          mensaje = 'Error del servidor. Intente más tarde.';
        } else if (err.error?.message) {
          mensaje = err.error.message;
        }
        Swal.fire('Error', mensaje, 'error');
      }
    });
  }

   obtenerTipo(mov: MovimientoDTO): string {
    return mov.cuentaOrigenId === this.idCuenta ? 'Enviado' : 'Recibido';
  }

  obtenerContraparte(mov: MovimientoDTO): string {
    return mov.cuentaOrigenId === this.idCuenta ? mov.cuentaDestinoId : mov.cuentaOrigenId;
  }
}
