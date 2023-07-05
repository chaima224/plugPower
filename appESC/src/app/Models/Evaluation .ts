import { DisStation } from './Disponibilite';
import { Station } from './Station';
import { User } from './User';

export class Evaluation {
  id!: string;
  user!: User;
  station!: Station;
  comment!: string;
  timestamp!: Date;
  status!: string;
}
