import { Component } from '@angular/core';
import { Consultation } from '../models/consultation.model';
import { RendezVous } from '../models/rendez-vous';
import { Personne } from '../models/personne';
import { Medecin } from '../models/medecin.model';
import {
  ConfirmEventType,
  ConfirmationService, MessageService,
  PrimeNGConfig
} from 'primeng/api';
import { PersonneService } from '../services/personne.service';
import { ConsultationService } from '../services/consultation.service';
import { MedecinService } from '../services/medecin.service';
import { RendezVousService } from '../services/rendez-vous.service';
@Component({

  selector: 'app-rendez-vous',
  templateUrl: './rendez-vous.component.html',
  styleUrls: ['./rendez-vous.component.scss'],
  providers: [MessageService],
})
export class RendezVousComponent {
  visible!: boolean;
  submitted!: boolean;

  btnText!: any;

  rendezVous!: RendezVous;
  listeRendezVous!: RendezVous[];

  listeMedecin!: Medecin[];
  listePersonne!: Personne[];
  listeConsultation!: Consultation[];

  constructor(
    private _personneService: PersonneService,
    private _messageService: MessageService,
    private _medecinService: MedecinService,
    private _consultationService: ConsultationService,
    private _rendezVousService: RendezVousService,
    private _confirmationService: ConfirmationService,
    private _config: PrimeNGConfig
  ) { }

  ngOnInit() {
    this.getListePersonne();
    this.getListeMedecin();
    this.getListeConsultation();
    this.getListeRendezVous();

  }
  // Cette fonction permet d'afficher le formulaire de saisie de rendez-vous
  showDialog() {
    this.visible = true;
    this.submitted = false;
    this.rendezVous = {};
    this.btnText = 'Ajouter';
  }

  getListeMedecin() {
    this._medecinService.getMedecin().subscribe({
      next: (reponse: any) => {
        this.listeMedecin = reponse;
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }


  getListeConsultation() {
    this._consultationService.getConsultation().subscribe({
      next: (reponse: any) => {
        this.listeConsultation = reponse;
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }
  getListePersonne() {
    this._personneService.getPersonnes().subscribe({
      next: (reponse: any) => {
        this.listePersonne = reponse;
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }
  getListeRendezVous() {
    this._rendezVousService.getRendezVous().subscribe({
      next: (reponse: any) => {
        this.listeRendezVous = reponse;
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }

  // Cette fonction permet de pré-remplir le formulaire avec les données d'une personne existante pour la modifier
  editRendezVous(rendezVous: RendezVous) {
    this.rendezVous = { ...rendezVous };
    this.visible = true;
    this.btnText = 'Modifier';
  }
  saveRendezVous(id: any, rendezVous: RendezVous) {
    this.submitted = true; // On indique que le formulaire a été soumis


    console.log("rdv ===>", rendezVous);



    // Vérification des champs du formulaire
    if (!rendezVous.patient || !rendezVous.medecin || !rendezVous.consultation) {

      // Si un champ est manquant, on affiche un message d'erreur avec l'objet MessageService et on quitte la fonction
      this._messageService.add({
        severity: 'error',
        summary: 'Erreur',
        detail: 'Veuillez remplir tous les champs.',
        life: 5000, // La durée pendant laquelle le message doit être affiché (en millisecondes)
      });
      return;
    }

    if (this.btnText === 'Ajouter') { // Si on est en train d'ajouter une nouvelle personne
      // On appelle le service pour créer la nouvelle personne
      this._rendezVousService.createRendezVous(rendezVous).subscribe(
        (res) => {
          this.visible = false;
          // On affiche un message de succès avec l'objet MessageService
          this._messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Rendez-Vous Ajouté',
            life: 5000, // La durée pendant laquelle le message doit être affiché (en millisecondes)
          });
          this.getListeRendezVous();
        }, (error: any) => {
          console.log(error); // On affiche l'erreur dans la console
        },
        //   {
        //   complete: () => {
        //     // On recharge la liste des personnes pour mettre à jour l'affichage
        //     this.visible = false;
        //     // On affiche un message de succès avec l'objet MessageService
        //     this._messageService.add({
        //       severity: 'success',
        //       summary: 'Success',
        //       detail: 'Rendez-Vous Ajouté',
        //       life: 5000, // La durée pendant laquelle le message doit être affiché (en millisecondes)
        //     });
        //     this.getListeRendezVous();
        //   },
        //   error: (error: any) => {
        //     console.log(error); // On affiche l'erreur dans la console
        //   },
        // }
      );
    }
    else { // Si on est en train de modifier une personne existante
      const index = this.listeRendezVous.findIndex((p) => p.id === id); // On récupère l'index de la personne dans la liste


      // Vérification si l'index est valide
      if (index === -1) {
        console.error('rendez-vous non trouvée dans la liste.');
        return;
      }

      // On appelle le service pour mettre à jour la personne avec l'identifiant et les données fournies
      this._rendezVousService.updateRendezVous(id, rendezVous).subscribe({
        next: (updatedRendezVous) => {
          this.listeRendezVous[index] = updatedRendezVous; // On met à jour la personne dans la liste locale avec les données reçues


          // On affiche un message de succès avec l'objet MessageService
          this._messageService.add({
            severity: 'success',
            summary: 'Succès',
            detail: 'rendezVous modifié avec succès',
            life: 5000, // La durée pendant laquelle le message doit être affiché (en millisecondes)
          });

          this.visible = false; // On masque la fenêtre modale après la mise à jour
        },
        error: (error: any) => {
          console.error('Erreur lors de la mise à jour de la rendezVous :', error); // On affiche l'erreur dans la console


          // On affiche un message d'erreur avec l'objet MessageService
          this._messageService.add({
            severity: 'error',
            summary: 'Erreur',
            detail: 'La mise à jour du rendezVous a échoué',
            life: 5000, // La durée pendant laquelle le message doit être affiché (en millisecondes)
          });
        },
        complete: () => {
          // Optionnel : Actions à réaliser après la complétion de l'opération
        }
      });
    }
  }

  deleteRendezVous(id: number) {
    // On ouvre une boîte de confirmation pour demander à l'utilisateur s'il est sûr de supprimer la personne sélectionnée
    this._confirmationService.confirm({
      message: 'Etes vous sûr de supprimer le rendez-vous selectionné ?', // Le message à afficher dans la boîte de confirmation
      header: 'Confirmer', // Le titre de la boîte de confirmation
      icon: 'pi pi-exclamation-triangle', // L'icône à afficher dans la boîte de confirmation
      accept: () => { // Si l'utilisateur accepte la confirmation
        // On appelle le service pour supprimer la personne avec l'identifiant passé en paramètre
        this._rendezVousService.deleteRendezVous(id).subscribe({
          complete: () => { // Si la suppression est complétée avec succès
            // On recharge la liste des personnes pour mettre à jour l'affichage
            this.getListeMedecin();
            // On affiche un message de succès avec l'objet MessageService
            this._messageService.add({
              severity: 'error',
              summary: 'success',
              detail: 'Rendez-vous supprimée.',
              life: 5000, // La durée pendant laquelle le message doit être affiché (en millisecondes)
            });
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































