import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-client',
  templateUrl: './new-client.component.html',
  styleUrls: ['./new-client.component.scss']
})
export class NewClientComponent implements OnInit {
  client = {
    name: '',
    email: '',
    cnpj: '',
    phone_number: ''
  };

  constructor() {}

  ngOnInit() {}
}
