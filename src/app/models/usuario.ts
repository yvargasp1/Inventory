import { Generic } from './generic';
export class Usuario implements Generic {
  id: number;
  nombre: string;
  password: string;
  enable: boolean;
  roles: string[] = [];
}
