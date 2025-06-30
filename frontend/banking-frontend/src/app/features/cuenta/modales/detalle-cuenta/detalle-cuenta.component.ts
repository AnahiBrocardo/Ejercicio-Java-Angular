import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CuentaBancaria } from 'src/app/modelos/cuentaBancaria.model';

@Component({
  selector: 'app-detalle-cuenta',
  templateUrl: './detalle-cuenta.component.html',
  styleUrls: ['./detalle-cuenta.component.css']
})
export class DetalleCuentaComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: CuentaBancaria) {}

  ngOnInit(): void {
  }

}
