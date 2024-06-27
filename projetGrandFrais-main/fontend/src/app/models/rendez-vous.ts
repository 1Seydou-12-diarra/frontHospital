import { Medecin } from "./medecin.model"
import { Consultation } from "./consultation.model"
import { Personne } from "./personne"
export class RendezVous {

  id?: number
  dateRendezVous?: Date
  medecin?: Medecin
  patient?: Personne
  consultation?: Consultation

  static Patient: any


  constructor(id?: number, dateRendezVous?: Date, medecin?: Medecin, patient?: Personne, consultation?: Consultation) {
    this.id = id;
    this.dateRendezVous;
    this.medecin = medecin;
    this.patient = patient;
    this.consultation = consultation;

  }
}
