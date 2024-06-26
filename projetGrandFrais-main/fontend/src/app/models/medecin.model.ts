export class Medecin {
    
    id ?: number
    nom ?: string
    specialite ?: string

    email ?: string
    static nom: any
  
  
    constructor(id ?: number,nom ?: string,specialite ?: string, email?: string) {
      this.id = id;
      this.nom = nom;
      this.specialite=specialite;
      this.email = email;
    }
  }
  
