import { Borne } from './Borne';
import { Emplacement } from './Emplacement';
import { Trajet } from './Trajet';

export interface Station {
  id: string;
  name: string;
  longitude: number;
  latitude: number;
  ouverture: Date;
  fermeture: Date;
  listeDeBornes: Borne[];
  emplacement: Emplacement;
  trajet: Trajet;
  distance: number;
}
