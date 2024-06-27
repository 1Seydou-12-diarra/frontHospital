import { Component } from '@angular/core';

// primeng importation
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  items!: MenuItem[];
  activeItem!: MenuItem;

  ngOnInit() {
    this.items = [
      { label: 'Home', icon: 'pi pi-fw pi-home', routerLink: '/home' },
      {
        label: 'Patient',
        icon: 'pi pi-fw pi-user',
        routerLink: '/Patient',
      },
      {
        label: 'Medecin',
        icon: 'pi pi-fw pi-user',
        routerLink: '/Medecin',
      },
      {
        label: 'Consulatation',
        icon: 'pi pi-fw pi-users',
        routerLink: '/Consultation',
      },
      {
        label: 'RendezVous',
        icon: 'pi pi-fw pi-users',
        routerLink: '/RendezVous',
      },
    ];

    this.activeItem = this.items[0];
  }
}
