import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { URL_ENDPOINT } from '../config/app';
import { Inventario } from '../models/inventario';
import { Usuario } from '../models/usuario';
//import { AuthService } from './auth.service';
import { CommonService } from './common.service';

//const base_url = environment.url_api;

@Injectable({
  providedIn: 'root',
})
export class UsuarioService extends CommonService<Usuario> {
  protected override urlEndPoint = URL_ENDPOINT + '/usuarios';

  constructor(http: HttpClient) {
    super(http);
  }

  public ListarporNombre(term: string): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(
      `${this.urlEndPoint}/filtrar-usuarios/${term}`
    );
  }

  public crearConImagen(
    Inventario: Inventario,
    archivo: File
  ): Observable<Inventario> {
    const formData = new FormData();
    formData.append('archivo', archivo);
    formData.append('nombre', Inventario.nombre);
    formData.append('cantidad', Inventario.cantidad.toString());

    let httpHeaders = new HttpHeaders();

    return this.http.post<Inventario>(
      this.urlEndPoint + '/crear-con-foto',
      formData,
      { headers: httpHeaders }
    );
  }
}
