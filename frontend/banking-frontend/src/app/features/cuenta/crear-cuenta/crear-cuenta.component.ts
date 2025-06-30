import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CuentaService } from 'src/app/servicios/cuenta/cuenta.service';

@Component({
  selector: 'app-crear-cuenta',
  templateUrl: './crear-cuenta.component.html',
  styleUrls: ['./crear-cuenta.component.css']
})
export class CrearCuentaComponent implements OnInit {
  formCrearCuenta: FormGroup;

  constructor(
    private fb: FormBuilder,
     private cuentaService: CuentaService,
    private dialogRef: MatDialogRef<CrearCuentaComponent>
  ) {
    this.formCrearCuenta = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  guardar() {
   if (this.formCrearCuenta.invalid) {
    this.formCrearCuenta.markAllAsTouched();
    return;
  }

  this.dialogRef.close(this.formCrearCuenta.value); 
  }

  cancelar() {
    this.dialogRef.close();
  }

}
