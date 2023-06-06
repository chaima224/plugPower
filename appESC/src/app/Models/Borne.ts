import { Connecteur } from './Connecteur';

import { Mode } from './Mode';

export class Borne {
  id!: string;
  name!: string;
  puissance!: number;
  tempsCharge!: number;
  connecteur!: string;
  mode!: string;

  description!: string;
  status!: string;
}
