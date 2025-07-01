import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CuentaBancaria } from 'src/app/interfaces/cuentaBancaria.model';
import { Saldo } from 'src/app/interfaces/saldo.model';

@Component({
  selector: 'app-editar-cuenta',
  templateUrl: './editar-cuenta.component.html',
  styleUrls: ['./editar-cuenta.component.css']
})
export class EditarCuentaComponent implements OnInit {

  formSaldo: FormGroup;

  constructor(
    private fb: FormBuilder,
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

    const saldoDTO: Saldo = {
      cuentaId: this.data.id,
      saldo: this.formSaldo.value.saldo
    };

    this.dialogRef.close(saldoDTO);
  }

  cancelar() {
    this.dialogRef.close('Cancelado');
  }
}
