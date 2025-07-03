import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { CuentaBancaria } from 'src/app/interfaces/cuentaBancaria.model';
import { CuentaService } from 'src/app/servicios/cuenta/cuenta.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle-cuenta',
  templateUrl: './detalle-cuenta.component.html',
  styleUrls: ['./detalle-cuenta.component.css']
})
export class DetalleCuentaComponent implements OnInit {
  cuenta: CuentaBancaria | undefined;
  idCuenta: string='';

  constructor(private cuentaService: CuentaService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.idCuenta = params['id'];
      this.obtenerCuenta();
     
      this.cuentaService.onCuentaActualizada().subscribe(id => {
        if (id === this.idCuenta) {
        this.obtenerCuenta();
      }
      });
       });

    }

  
  obtenerCuenta(){
   this.cuentaService.getCuentaPorId(this.idCuenta).subscribe({
        next: (cuenta) => {
          this.cuenta = cuenta;
        },
        error: (err) => {
          let mensaje = '';
          if (err && err.status === 404) {
            mensaje = 'No se encontraron resultados.';
          } else if (err && err.status === 500) {
            mensaje = 'Error del servidor. Intente más tarde.';
          } else if (err && err.error && err.error.message) {
            mensaje = err.error.message;
          }
          Swal.fire('Error', mensaje, 'error');
        }
      });
    }
}
