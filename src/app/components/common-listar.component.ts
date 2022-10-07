import { Directive, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import Swal from 'sweetalert2';
import { Generic } from '../models/generic';
import { CommonService } from '../services/common.service';

@Directive()
export abstract class CommonListarComponent<
  E extends Generic,
  S extends CommonService<E>
> implements OnInit
{
  titulo: string;
  lista: E[];
  protected nombreModel: string;
  totalRegistros = 0;
  totalPorPagina = 5;
  paginaActual = 0;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(protected service: S) {}

  ngOnInit(): void {
    //this.service.listar();
    //console.log(this.service.listar());
    this.calcularRangos();
  }

  paginar(event: PageEvent): void {
    this.paginaActual = event.pageIndex;
    this.totalPorPagina = event.pageSize;
    this.calcularRangos();
  }

  private calcularRangos() {
    this.service
      .listarPagina(
        this.paginaActual.toString(),
        this.totalPorPagina.toString()
      )
      .subscribe((p) => {
        console.log(p);
        this.lista = p.content as E[];
        this.totalRegistros = p.totalElements as number;
        this.paginator._intl.itemsPerPageLabel = 'Registros por pagina';
      });
  }

  public eliminar(entity: E): void {
    Swal.fire({
      title: 'Alerta',
      text: `Seguro de eliminar a ${entity.nombre}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.eliminar(entity.id).subscribe(() => {
          this.calcularRangos();
          Swal.fire(
            'Eliminado',
            `${this.nombreModel} ${entity.nombre} eliminado con exito`,
            'success'
          );
        });
      }
    });
  }
}
