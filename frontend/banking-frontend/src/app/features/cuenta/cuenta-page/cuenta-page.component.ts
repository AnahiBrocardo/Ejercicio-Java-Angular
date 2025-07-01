import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TransferenciaComponent } from '../transferencia/transferencia.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-cuenta-page',
  templateUrl: './cuenta-page.component.html',
  styleUrls: ['./cuenta-page.component.css']
})
export class CuentaPageComponent implements OnInit {
  mostrarMovimientos = false;
  idCuenta!: string;

  constructor(private route: ActivatedRoute, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.idCuenta = this.route.snapshot.paramMap.get('id')!;
  }

  irATransferencia() {
    const dialogRef = this.dialog.open(TransferenciaComponent, {
      data: {
        cuentaOrigenId: this.idCuenta
      }
    });
  }


}
