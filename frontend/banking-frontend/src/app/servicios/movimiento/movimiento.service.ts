import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MovimientoDTO } from 'src/app/interfaces/movimiento.model';
import { Transferencia } from 'src/app/interfaces/transferencia.model';

@Injectable({
  providedIn: 'root'
})
export class MovimientoService {
  private apiUrl="http://localhost:8080/movimientos";
  
  constructor(private http: HttpClient) { }

  crearTransferencia(transferencia: Transferencia): Observable<MovimientoDTO> {
      return this.http.post<MovimientoDTO>(this.apiUrl, transferencia);
    }


    getMovimientoPorId(id: string): Observable<MovimientoDTO[]> {
        return this.http.get<MovimientoDTO[]>(`${this.apiUrl}/${id}`);
      }
}
