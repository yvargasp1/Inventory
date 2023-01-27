import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { URL_ENDPOINT } from '../config/app';

import { Inventario } from '../models/inventario';
//import { AuthService } from './auth.service';
import { CommonService } from './common.service';

//const base_url = environment.url_api;

@Injectable({
  providedIn: 'root',
})
export class InventarioService extends CommonService<Inventario> {
  protected override urlEndPoint = URL_ENDPOINT + '/inventarios';
  /*  protected override httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  }); */
  constructor(http: HttpClient) {
    super(http);
  }

  public override listar(): Observable<Inventario[]> {
    return this.http.get<Inventario[]>(this.urlEndPoint);
  }

  public crearConImagen(
    Inventario: Inventario,
    archivo: File
  ): Observable<Inventario> {
    const formData = new FormData();

    console.log('Archivo', archivo);
    formData.append('archivo', archivo);
    formData.append('nombre', Inventario.nombre);
    console.log('Fecha', Inventario.createAt);
    formData.append('createAt', Inventario.createAt.toString());
    formData.append('cantidad', Inventario.cantidad.toString());

    console.log('createAT', formData.get('createAt'));

    // Display the values

    let httpHeaders = new HttpHeaders();

    return this.http.post<Inventario>(
      this.urlEndPoint + '/crear-con-foto',
      formData,
      {
        // headers: httpHeaders
      }
    );
  }
}
