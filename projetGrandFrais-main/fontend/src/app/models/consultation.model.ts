import Decimal from 'decimal.js'; // Importation par défaut

export class Consultation {
    id ?: number
    dateConsultation ?: Date
    rapportConsultation ?: string
    prixConsultation ?:Decimal
  static rapportConsultation: any


  constructor(id ?: number,dateConsultation ?:Date,rapportConsultation?: string,prixConsultation?: Decimal) {
    this.id = id;
    this.dateConsultation = dateConsultation;
    this.rapportConsultation = rapportConsultation;
    this.prixConsultation = prixConsultation;
   
  }
}
