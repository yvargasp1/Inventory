import { Component, OnInit } from '@angular/core';
import { stringify } from 'querystring';
import { Inventario } from 'src/app/models/inventario';
import { InventarioService } from 'src/app/services/Inventario.Service';
import { Router } from '@angular/router';
import { CommonListarComponent } from '../common-listar.component';
import { URL_ENDPOINT } from 'src/app/config/app';
//import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-Inventarios',
  templateUrl: './inventarios.component.html',
})
export class InventariosComponent
  extends CommonListarComponent<Inventario, InventarioService>
  implements OnInit
{
  urlEndPoint = URL_ENDPOINT + '/inventarios';

  constructor(InventarioService: InventarioService) {
    super(InventarioService);
    //  authService.logout()
    this.titulo = 'Listado de Inventario';
    this.nombreModel = Inventario.name;
    console.log(this.lista);
  }
  filterPost: '';
}
