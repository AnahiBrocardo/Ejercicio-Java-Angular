import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CuentaBancaria } from 'src/app/modelos/cuentaBancaria.model';

@Injectable({
  providedIn: 'root'
})
export class CuentaService {

  private apiUrl="http://localhost:8080/accounts";

  constructor(private http: HttpClient) { }

  getCuentas(): Observable<CuentaBancaria[]>{
    return this.http.get<CuentaBancaria[]>('${this.apiUrl');
  }

  getCuentaPorId(id: string): Observable<CuentaBancaria> {
    return this.http.get<CuentaBancaria>(`${this.apiUrl}/${id}`);
  }

  crearCuenta(cuenta: CuentaBancaria): Observable<CuentaBancaria> {
    return this.http.post<CuentaBancaria>(this.apiUrl, cuenta);
  }

  actualizarSaldo(id: string, nuevoSaldo: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}`, { saldo: nuevoSaldo });
  }

  eliminarCuenta(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
