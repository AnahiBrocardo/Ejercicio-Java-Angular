import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CuentaBancaria } from 'src/app/interfaces/cuentaBancaria.model';
import { CuentaService } from 'src/app/servicios/cuenta/cuenta.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-cuenta',
  templateUrl: './editar-cuenta.component.html',
  styleUrls: ['./editar-cuenta.component.css']
})
export class EditarCuentaComponent implements OnInit {

  formSaldo: FormGroup;

  constructor(
    private fb: FormBuilder,
    private cuentaService: CuentaService,
    public dialogRef: MatDialogRef<EditarCuentaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CuentaBancaria
  ) {
    this.formSaldo = this.fb.group({
      saldo: [data.saldo, [Validators.required, Validators.min(0)]]
    });
  }
  ngOnInit(): void {

  }

  guardar() {
    if (this.formSaldo.invalid) {
      this.formSaldo.markAllAsTouched();
      return;
    }

    
    const saldoDTO = {
      cuentaId: this.data.id,
      saldo: this.formSaldo.value.saldo
    }
     
    this.cuentaService.actualizarSaldo(saldoDTO).subscribe({
      next: () => this.dialogRef.close('actualizado'),
      error: err => {
        if (err.status === 400) {
          const mensaje = err.error?.message;
          Swal.fire('Error', mensaje, 'error');
        } else if (err.status === 404) {
          Swal.fire('Error', 'Cuenta no encontrada', 'error');
        } else {
          Swal.fire('Error', 'Error del servidor, inténtalo más tarde', 'error');
        }
      }
      });
  
  }

  cancelar() {
    this.dialogRef.close('Cancelado');
  }
}
