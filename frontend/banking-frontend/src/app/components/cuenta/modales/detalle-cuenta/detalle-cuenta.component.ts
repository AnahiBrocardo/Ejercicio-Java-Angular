import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CuentaBancaria } from 'src/app/interfaces/cuentaBancaria.model';
import { CuentaService } from 'src/app/servicios/cuenta/cuenta.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle-cuenta',
  templateUrl: './detalle-cuenta.component.html',
  styleUrls: ['./detalle-cuenta.component.css']
})
export class DetalleCuentaComponent implements OnInit {
  @Input() id!: string;
  cuenta: CuentaBancaria| undefined;

  constructor( private cuentaService: CuentaService) { }

  ngOnInit(): void {
    this.cuentaService.getCuentaPorId(this.id).subscribe({
      next: (cuenta) => {
        this.cuenta = cuenta;
        },
        error: (err) => {
          let mensaje;
          if (err.status === 404) {
            mensaje = 'No se encontraron resultados.';
          } else if (err.status === 500) {
            mensaje = 'Error del servidor. Intente más tarde.';
          } else if (err.error?.message) {
            mensaje = err.error.message;
          }
          Swal.fire('Error', mensaje, 'error');
        }            
      });    
  }
}
