import { Borne } from './Borne';
import { Emplacement } from './Emplacement';
import { Trajet } from './Trajet';

export class Station {
  id!: string;
  name!: string;
  longitude!: number;
  latitude!: number;
  ouverture!: Date;
  fermeture!: Date;
  nomBornes: string[] = [];
  emplacement!: string;
  trajet!: string;
  distance!: number;
  moyNote?: number;
}
