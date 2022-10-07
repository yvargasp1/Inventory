import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { flatMap, map, startWith } from 'rxjs/operators';
import { Inventario } from 'src/app/models/inventario';
import { Usuario } from 'src/app/models/usuario';
import { InventarioService } from 'src/app/services/Inventario.Service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { UsuarioService } from 'src/app/services/usuario.Service';

import Swal from 'sweetalert2';
import { CommonFormComponent } from '../common-form.component';

@Component({
  selector: 'app-Inventario-form',
  templateUrl: './inventarios-form.component.html',
  styleUrls: ['./inventarios.component.css'],
})
export class InventarioFormComponent
  extends CommonFormComponent<Inventario, InventarioService>
  implements OnInit
{
  private imagenSeleccionada: File;
  lista: [];
  listausuarios: Usuario[];
  inventario: Inventario = new Inventario();
  usuario: Usuario = new Usuario();
  usuarioFiltrado: Observable<Usuario[]>;
  autoCompleteControl = new FormControl();

  constructor(
    private InventarioService: InventarioService,
    router: Router,
    route: ActivatedRoute,
    private UsuarioService: UsuarioService
  ) {
    super(InventarioService, router, route);
    this.titulo = 'Formulario Inventario';
    this.model = new Inventario();
    this.redirect = '/inventarios';
    this.nombreModel = Inventario.name;
  }

  override ngOnInit(): void {
    this.usuarioFiltrado = this.autoCompleteControl.valueChanges.pipe(
      map((value) => (typeof value === 'string' ? value : value.nombre)),
      flatMap((value) => (value ? this._filter(value) : []))
    );

    this.editar();
    console.log(this.usuarioFiltrado);
  }

  seleccionarinventario(event: MatAutocompleteSelectedEvent): Usuario {
    let inventario = event.option.value as Usuario;
    console.log(inventario);
    let nuevoItem = new Usuario();
    nuevoItem.id = inventario.id;
    nuevoItem.nombre = inventario.nombre;

    console.log(nuevoItem);
    //this.inventario.usuario.push(nuevoItem);
    this.model.usuario = nuevoItem;
    console.log('Con usuarario', this.model);

    this.autoCompleteControl.setValue('');
    event.option.focus();
    event.option.deselect();

    return nuevoItem;
  }
  mostrarNombre(usuario?: Usuario): string | undefined {
    return usuario ? usuario.nombre : undefined;
  }
  private _filter(value: string): Observable<Usuario[]> {
    const filterValue = value.toLowerCase();
    console.log(this.UsuarioService.ListarporNombre(filterValue));
    return this.UsuarioService.ListarporNombre(filterValue);
  }
  seleccionarImagen(event: { target: { files: File[] } }): void {
    this.imagenSeleccionada = event.target.files[0];
    console.info(this.imagenSeleccionada);
    if (this.imagenSeleccionada.type.indexOf('image') < 0) {
      this.imagenSeleccionada = null;
      Swal.fire(
        'Error al seleccionar imagen',
        'El archivo debe ser una imagen',
        'error'
      );
    }
  }

  public override crear() {
    var bandera: boolean;
    console.log('inicio bandera', bandera);
    let nuevoItem = new Usuario();
    if (!this.imagenSeleccionada) {
      console.log('Flujo normal', this.model.usuario);

      this.service.listar().forEach((p) => {
        console.log(p.length);

        console.log(this.model.createAt);
        for (var i = 0; i < p.length; i++) {
          //  console.log('x--nombre', p[i].nombre);
          if (p[i].nombre == this.model.nombre) {
            bandera = true;
            console.log('nombre', p[i].nombre);
            console.log(bandera);
            break;
          } else {
            bandera = false;
            console.log('diferente nombre', p[i].nombre);
          }
        }

        console.log('fin bandera', bandera);

        if (bandera == true) {
          Swal.fire(
            'El producto',
            `${this.nombreModel} ${this.model.nombre} ya se encuentra creado en el sistema.`,
            'warning'
          );
        } else {
          const date = new Date(this.model.createAt.toString());

          let today = new Date();
          let today_show = moment(today).format('YYYY-MM-DD');

          if (date <= today && !isNaN(this.model.cantidad)) {
            super.crear();
          } else {
            if (date > today) {
              Swal.fire(
                'Validar fecha',
                `La fecha de ingreso : ${this.model.createAt} , no puede ser mayor a la fecha actual : ${today_show}.`,
                'warning'
              );
            } else {
              Swal.fire(
                'Validar cantidad',
                `La cantidad : ${this.model.cantidad}, debe ser un numero.`,
                'warning'
              );
            }
          }
        }
      });
    } else {
      this.service
        .crearConImagen(this.model, this.imagenSeleccionada)
        .subscribe(
          (producto) => {
            Swal.fire(
              'Nuevo',
              `${this.nombreModel} ${producto.nombre} creado con exito!`,
              'success'
            );
            this.router.navigate([this.redirect]);
          },
          (err) => {
            if (err.status === 400) {
              this.error = err.error;
            }
          }
        );
    }
  }

  public override modificar() {
    if (!this.imagenSeleccionada) {
      const date = new Date(this.model.createAt.toString());

      let today = new Date();
      let today_show = moment(today).format('YYYY-MM-DD');

      if (date <= today) {
        super.modificar();
      } else {
        Swal.fire(
          'Validar fecha',
          `La fecha de ingreso : ${this.model.createAt} , no puede ser mayor a la fecha actual : ${today_show}.`,
          'warning'
        );
      }
    } else {
      /* this.service
        .editarConImagen(this.model, this.imagenSeleccionada)
        .subscribe(
          (producto) => {
            Swal.fire(
              'Modificado',
              `${this.nombreModel} ${producto.nombre} actualizado con exito!`,
              'success'
            );
            console.info(this.model);
            this.router.navigate([this.redirect]);
          },
          (err) => {
            if (err.status === 400) {
              this.error = err.error;
            }
          }
        ); */
    }
  }
}
