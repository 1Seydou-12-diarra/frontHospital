import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ListePersonneComponent } from './components/liste-personne/liste-personne.component';
import { MedecinComponent } from './medecin/medecin.component';
import { ConsultationComponent } from './consultation/consultation.component';
import { RendezVousComponent } from './rendez-vous/rendez-vous.component';
const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'Patient',
    component: ListePersonneComponent
  },
  {
    path: 'Medecin',
    component: MedecinComponent
  },
  {
    path: 'Consultation',
    component: ConsultationComponent
  },
  {
    path: 'RendezVous',
    component: RendezVousComponent
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
