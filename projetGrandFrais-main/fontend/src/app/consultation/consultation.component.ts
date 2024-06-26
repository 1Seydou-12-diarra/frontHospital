import { Component } from '@angular/core';
import {
  ConfirmEventType,
  ConfirmationService,
  FilterMatchMode,
  MessageService,
  PrimeNGConfig,
} from 'primeng/api';
import { ConsultationService } from '../services/consultation.service';
import { Consultation } from '../models/consultation.model';
@Component({
  selector: 'app-consultation',
  templateUrl: './consultation.component.html',
  styleUrls: ['./consultation.component.scss'],
  providers: [MessageService]

})
export class ConsultationComponent {

  visible !: boolean;
  submitted !: boolean;

  btnText !: any;

  consultation!: Consultation;
  listeConsultation!: Consultation[];

  constructor(
    private _consultationService: ConsultationService,
    private _messageService: MessageService,
    // private _departementService: DepartementService,
    private _confirmationService: ConfirmationService,
    private _config : PrimeNGConfig
  ) {}

  ngOnInit() {
    this.getListeConsultation();
  }
    // Cette fonction permet d'afficher le formulaire de saisie de personne
  showDialog() {
    this.visible = true;
    this.submitted = false;
    this.consultation = {};
    this.btnText = 'Ajouter';
  }
  getListeConsultation() {
    this._consultationService.getConsultation().subscribe({
      next: (reponse) => {
        this.listeConsultation = reponse;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  
 // Cette fonction permet de pré-remplir le formulaire avec les données d'une personne existante pour la modifier
 editConsultation(consultation: Consultation) {
  this.consultation = { ...consultation, };
  this.visible = true;
  this.btnText = 'Modifier';
}

saveConsultation(id: any, consultation: Consultation): void {
  this.submitted = true; // On indique que le formulaire a été soumis

  // Vérification des champs du formulaire
  if (!consultation.dateConsultation || !consultation.rapportConsultation || !consultation.prixConsultation) {
    // Si un champ est manquant, on affiche un message d'erreur avec l'objet MessageService et on quitte la fonction
    this._messageService.add({
      severity: 'error',
      summary: 'Erreur',
      detail: 'Veuillez remplir tous les champs.',
      life: 5000, // La durée pendant laquelle le message doit être affiché (en millisecondes)
    });
    return;
  }

  if (this.btnText === 'Ajouter') { // Si on est en train d'ajouter une nouvelle consultation
    // On appelle le service pour créer la nouvelle consultation
    this._consultationService.createConsultation(consultation).subscribe(
      response => {
        console.log('Consultation sauvegardée avec succès', response);
        // Traitez la réponse, mettez à jour l'état si nécessaire
        this.visible = false;
        this._messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Consultation sauvegardée avec succès.',
          life: 5000,
        });
        this.getListeConsultation()
      },
      error => {
        console.error('Erreur lors de la sauvegarde de la consultation', error);
        // Gérez l'erreur, montrez un message à l'utilisateur si nécessaire
        this._messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: 'Erreur lors de la sauvegarde de la consultation.',
          life: 5000,
        });
      }
    );
  } else {
    const index = this.listeConsultation.findIndex((p) => p.id === id); // On récupère l'index de la personne dans la liste

    // Si on est en train de modifier une consultation existante
    this._consultationService.updateConsultation(id, consultation).subscribe({ 
      next: (updatedConsultation) => { // Si la mise à jour est réussie, on obtient les données mises à jour
        this.listeConsultation[index] = updatedConsultation; // On met à jour la personne dans la liste locale avec les données reçues
    
        // On affiche un message de succès avec l'objet MessageService
        this._messageService.add({
          severity: 'success',
          summary: 'Succès',
          detail: 'Consultation modifié avec succès',
          life: 5000, // La durée pendant laquelle le message doit être affiché (en millisecondes)
        });

        this.visible = false; // On masque la fenêtre modale après la mise à jour
  },
  error: (error: any) => { // Si une erreur se produit pendant la mise à jour
    console.error('Erreur lors de la mise à jour de la personne :', error); // On affiche l'erreur dans la console

    // On affiche un message d'erreur avec l'objet MessageService
    this._messageService.add({
      severity: 'error',
      summary: 'Erreur',
      detail: 'La mise à jour du patient a échoué',
      life: 5000, // La durée pendant laquelle le message doit être affiché (en millisecondes)
    });
  },
  complete: () => {
    // Optionnel : Actions à réaliser après la complétion de l'opération
  }
});
}}
  
  



  // Cette fonction permet de supprimer une personne de la liste
 // Cette fonction permet de supprimer une personne en utilisant l'identifiant passé en paramètre

 deleteConsultation(id: number) {
  // On ouvre une boîte de confirmation pour demander à l'utilisateur s'il est sûr de supprimer la personne sélectionnée
  this._confirmationService.confirm({
    message: 'Etes vous sûr de supprimer la consultation selectionnée ?', // Le message à afficher dans la boîte de confirmation
    header: 'Confirmer', // Le titre de la boîte de confirmation
    icon: 'pi pi-exclamation-triangle', // L'icône à afficher dans la boîte de confirmation
    accept: () => { // Si l'utilisateur accepte la confirmation
      // On appelle le service pour supprimer la personne avec l'identifiant passé en paramètre
      this._consultationService.deleteConsultation(id).subscribe({
        complete: () => { // Si la suppression est complétée avec succès
          // On recharge la liste des personnes pour mettre à jour l'affichage
          // On affiche un message de succès avec l'objet MessageService
          this._messageService.add({
            severity: 'error',
            summary: 'success',
            detail: 'Consultation supprimée.',
            life: 5000, // La durée pendant laquelle le message doit être affiché (en millisecondes)
          });
          this.getListeConsultation();

        },
        error: (error: any) => { // Si une erreur se produit pendant la suppression
          console.log(error); // On affiche l'erreur dans la console
        },
      });
    },
    reject: (type: any) => { // Si l'utilisateur rejette la confirmation ou annule l'action
      switch (type) {
        case ConfirmEventType.REJECT: // Si l'utilisateur rejette la confirmation
          // On affiche un message d'erreur avec l'objet MessageService
          this._messageService.add({
            severity: 'error',
            summary: 'Rejet',
            detail: 'vous avez rejecté la suppression',
          });
          break;
        case ConfirmEventType.CANCEL: // Si l'utilisateur annule l'action
          // On affiche un message d'avertissement avec l'objet MessageService
          this._messageService.add({
            severity: 'warn',
            summary: 'Annulation',
            detail: 'vous avez annulé la suppression',
          });
          break;
      }
    },
  });

}

}
