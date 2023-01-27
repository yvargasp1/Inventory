import { Generic } from './generic';
import { Usuario } from './usuario';

export class Inventario implements Generic {
  id: number;
  nombre: string;
  cantidad: number;
  imagen: number;
  createAt: string;
  usuario: Usuario;
}
