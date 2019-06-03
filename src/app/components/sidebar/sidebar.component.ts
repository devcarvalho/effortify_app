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
      link: 'dashboard',
      isActive: true
    },
    {
      label: 'Clientes',
      icon: 'business',
      link: 'clients',
      isActive: false
    },
    {
      label: 'Usuários',
      icon: 'person',
      link: 'users',
      isActive: false
    },
    {
      label: 'Apontamentos',
      icon: 'access_time',
      link: 'notes',
      isActive: false
    },
    {
      label: 'Projetos',
      icon: 'work',
      link: 'projects',
      isActive: false
    },
    {
      label: 'Sprints',
      icon: 'settings_backup_restore',
      link: 'sprints',
      isActive: false
    },
    {
      label: 'Estórias',
      icon: 'collections_bookmark',
      link: 'stories',
      isActive: false
    },
    {
      label: 'Atividades',
      icon: 'library_books',
      link: 'tasks',
      isActive: false
    }
  ];

  constructor(private sessionService: SessionService) {}

  ngOnInit() {
    switch (this.userData.userLevel) {
      case 2:
        this.navItems = this.admNavItems;
        break;
      default:
        return null;
    }
  }
}
