import { Component, OnInit, Input } from '@angular/core';

import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Input() userData: any;
  navItems = [];
  admNavItems = [
    {
      label: 'Dashboard',
      icon: 'dashboard',
      link: 'dashboard'
    },
    {
      label: 'Usuários',
      icon: 'person',
      link: 'usuarios'
    },
    {
      label: 'Clientes',
      icon: 'business',
      link: 'clientes'
    },
    {
      label: 'Projetos',
      icon: 'work',
      link: 'projetos'
    },
    {
      label: 'Sprints',
      icon: 'settings_backup_restore',
      link: 'sprints'
    },
    {
      label: 'Estórias',
      icon: 'collections_bookmark',
      link: 'estorias'
    },
    {
      label: 'Atividades',
      icon: 'library_books',
      link: 'atividades'
    },
    {
      label: 'Apontamentos',
      icon: 'access_time',
      link: 'apontamentos'
    }
  ];

  constructor(private sessionService: SessionService) {}

  ngOnInit() {
    switch (this.userData.userLevel) {
      case 0:
        this.navItems = this.admNavItems;
        break;
      default:
        return null;
    }
  }
}
