import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject  } from 'rxjs';
import { CuentaBancaria } from 'src/app/interfaces/cuentaBancaria.model';
import { Saldo } from 'src/app/interfaces/saldo.model';

@Injectable({
  providedIn: 'root'
})
export class CuentaService {

  private apiUrl="http://localhost:8080/accounts";
  private cuentaActualizadaSubject = new Subject<string>();

  constructor(private http: HttpClient) { }

  getCuentas(): Observable<CuentaBancaria[]>{
    return this.http.get<CuentaBancaria[]>(this.apiUrl);
  }

  getCuentaPorId(id: string): Observable<CuentaBancaria> {
    return this.http.get<CuentaBancaria>(`${this.apiUrl}/${id}`);
  }

  crearCuenta(cuenta: CuentaBancaria): Observable<CuentaBancaria> {
    return this.http.post<CuentaBancaria>(this.apiUrl, cuenta);
  }

  actualizarSaldo(dto: Saldo): Observable<any> {
    return this.http.put(`${this.apiUrl}/actualizar-saldo`, dto);
  }

  eliminarCuenta(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  emitirCuentaActualizada(id: string) {
    this.cuentaActualizadaSubject.next(id);
  }

  onCuentaActualizada(): Observable<string> {
    return this.cuentaActualizadaSubject.asObservable();
  }
}
