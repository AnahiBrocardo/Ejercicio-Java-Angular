import { Component, OnInit } from '@angular/core';
import { CuentaBancaria } from 'src/app/modelos/cuentaBancaria.model';
import { CuentaService } from 'src/app/servicios/cuenta/cuenta.service';

@Component({
  selector: 'app-cuentas-component',
  templateUrl: './cuentas-component.component.html',
  styleUrls: ['./cuentas-component.component.css']
})
export class CuentasComponentComponent implements OnInit {
  cuentas: CuentaBancaria[]= [];
  columnas: string[]=  ['orden', 'titular', 'saldo', 'acciones'];

  constructor(private cuentaService: CuentaService) { }

  ngOnInit(): void {
   this.obtenerCuentas();
  }

  obtenerCuentas(): void{
    this.cuentaService.getCuentas().subscribe({
      next: (data: CuentaBancaria[])=>{
      this.cuentas= data;
      },
      error:(err)=>{
      }
    })
  }

}
