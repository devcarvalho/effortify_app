import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  tableOpts = {
    title: 'Usuários',
    subtitle:
      'Listagem de todos os usuários cadastrados no sistema com exceção dos administradores.'
  };
  tableColumns = [
    'name',
    'role',
    'email',
    'phone_number',
    'hour_value',
    'view'
  ];

  tableColumnTitle = {
    name: 'Nome',
    role: 'Função',
    cnpj: 'CNPJ',
    email: 'Email',
    phone_number: 'Telefone',
    hour_value: 'Valor/hr',
    view: 'Visualizar'
  };
  tableData = [];
  showTable = false;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.userService.getUsers().subscribe((users: any) => {
      if (users.length) {
        users.map((user: any) => {
          switch (user.role) {
            case 'qa':
              user.role = 'Quality Assurance';
              break;
            case 'front_end_dev':
              user.role = 'Desenvolvedor Front End';
              break;
            case 'back_end_dev':
              user.role = 'Desenvolvedor Back End';
              break;
            case 'full_stack_dev':
              user.role = 'Desenvolvedor Full Stack';
              break;
          }
          this.showTable = false;
          this.tableData.push(user);
          if (this.tableData.length === users.length) {
            this.showTable = true;
          }
        });
      } else {
        this.showTable = true;
      }
    });
  }

  newUser() {
    this.router.navigate(['usuarios/novo']);
  }

  viewUser(userId: string) {
    this.router.navigate([`usuarios/${userId}`]);
  }
}
