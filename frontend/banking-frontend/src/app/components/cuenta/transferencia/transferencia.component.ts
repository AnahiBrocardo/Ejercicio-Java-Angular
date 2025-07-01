import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CuentaBancaria } from 'src/app/interfaces/cuentaBancaria.model';
import { Transferencia } from 'src/app/interfaces/transferencia.model';
import { CuentaService } from 'src/app/servicios/cuenta/cuenta.service';
import { MovimientoService } from 'src/app/servicios/movimiento/movimiento.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-transferencia',
  templateUrl: './transferencia.component.html',
  styleUrls: ['./transferencia.component.css']
})
export class TransferenciaComponent implements OnInit {

  form: FormGroup;
  cuentasDestino: CuentaBancaria[] = [];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<TransferenciaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { cuentaOrigenId: string },
    private cuentaService: CuentaService,
    private movimientoService: MovimientoService
  ) {
    this.form = this.fb.group({
      cuentaDestinoId: ['', [Validators.required]],
      monto: ['', [Validators.required, Validators.min(0.01)]]
    });
  }

  ngOnInit(): void {
    this.cuentaService.getCuentas().subscribe({
      next: cuentas => {
        this.cuentasDestino = cuentas.filter(c => c.id !== this.data.cuentaOrigenId);
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

  enviarTransferencia() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const transferencia: Transferencia = {
      cuentaOrigenId: this.data.cuentaOrigenId,
      cuentaDestinoId: this.form.value.cuentaDestinoId,
      monto: this.form.value.monto
    };

    this.movimientoService.crearTransferencia(transferencia).subscribe({
    next: (movimiento) => {
      Swal.fire('Éxito', 'Transferencia realizada con éxito.', 'success');
      this.dialogRef.close(movimiento); 
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
  this.dialogRef.close('transferencia-realizada');
  }

  cancelar() {
    this.dialogRef.close();
  }

}
