

export class Personne {
  id ?: number
  nom ?: string
  prenom ?: string
  adresse ?: string
  telephone ?: string
  email ?: string


  constructor(id ?: number,nom ?: string,prenom?: string,adresse ?: string,telephone?: string,email?: string) {
    this.id = id;
    this.nom = nom;
    this.prenom = prenom;
    this.adresse = adresse;
    this.telephone =telephone;
    this.email = email;
  }
}
