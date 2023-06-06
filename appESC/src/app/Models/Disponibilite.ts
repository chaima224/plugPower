export class Disponibilite {
  id!: string; // Initialisez la propriété id avec une valeur par défaut
  borne!: DisBorne;
  station!: DisStation;
  dateDebut!: Date; // Modifiez le type de données en LocalDateTime
  dateFin!: Date; // Modifiez le type de données en LocalDateTime
  etat!: string;
}

export class DisBorne {
  id!: string;
}

export class DisStation {
  id!: string;
}
