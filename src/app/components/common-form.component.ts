import { Directive, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Generic } from '../models/generic';
import { CommonService } from '../services/common.service';

@Directive()
export abstract class CommonFormComponent<
  E extends Generic,
  S extends CommonService<E>
> implements OnInit
{
  titulo: string;
  model: E;
  error: any;
  protected redirect: string;
  protected nombreModel: string;
  constructor(
    protected service: S,
    protected router: Router,
    protected route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.editar();
  }

  public crear() {
    this.service.crear(this.model).subscribe(
      (m) => {
        Swal.fire(
          'Nuevo',
          `${this.nombreModel} ${m.nombre} creado con exito!`,
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

  public editar(): void {
    this.route.params.subscribe((params) => {
      let id = params['id'];
      if (id) {
        this.service.ver(id).subscribe((m) => (this.model = m));
      }
    });
  }

  public modificar() {
    this.service.modificar(this.model).subscribe(
      (m) => {
        Swal.fire(
          'Modificado',
          `${this.nombreModel} ${m.nombre} actualizado con exito!`,
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
