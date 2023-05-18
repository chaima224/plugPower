import { Connecteur } from './Connecteur';
import { Disponibilite } from './Disponibilite';
import { Mode } from './Mode';

export class Borne {
  id!: string;
  name!: string;
  puissance!: number;
  tempsCharge!: number;
  connecteur!: Connecteur;
  mode!: Mode;
  disponibilite!: Disponibilite;
}