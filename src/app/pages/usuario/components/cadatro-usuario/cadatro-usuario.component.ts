import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cadatro-usuario',
  templateUrl: './cadatro-usuario.component.html',
  styleUrls: ['./cadatro-usuario.component.scss']
})
export class CadatroUsuarioComponent implements OnInit {

  breadcrumbItems = [
    { label: 'Início', url: '/home' },
    { label: 'Cadastro', url: '' },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
