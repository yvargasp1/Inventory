import { Generic } from './generic';
import { Usuario } from './usuario';

export class Inventario implements Generic {
  id: number;
  nombre: string;
  cantidad: number;
  imagenHashCode: number;
  createAt: String;
  usuario: Usuario;
}
