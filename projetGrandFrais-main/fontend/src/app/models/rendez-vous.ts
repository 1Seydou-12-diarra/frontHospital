import { Medecin } from "./medecin.model"
import { Consultation } from "./consultation.model"
import { Personne } from "./personne"
export class RendezVous {
    id ?: number
    medecin ?: Medecin
    patient ?: Personne
    consultation ?: Consultation
  
    static Patient: any
  
  
    constructor(id ?: number,medecin ?: Medecin,patient ?: Personne, consultation ?: Consultation) {
      this.id = id;
      this.medecin = medecin;
      this.patient = patient;
      this.consultation = consultation;
      
    }
}
