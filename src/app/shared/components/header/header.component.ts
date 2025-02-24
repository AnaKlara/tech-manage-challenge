import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  dadosUsuario = {
    nome: 'Ana CLara Corrrea da Silva',
    chave: 'ID12345678',
    email: 'claracorreadasilva@gmail.com',
  };

  constructor(private router: Router) {}

  redirectTo(pagename: string): void {
    void this.router.navigateByUrl(pagename);
  }

  helpButtonClick() {}
  notificationButtonClick() {}
  suportButtonClick() {
  }
}
