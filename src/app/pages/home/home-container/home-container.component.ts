import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-container',
  templateUrl: './home-container.component.html',
  styleUrls: ['./home-container.component.scss']
})
export class HomeContainerComponent {

  constructor(private router: Router) {}

  redirectTo(pagename: string): void {
    const path = 'pages/' + pagename;
    this.router.navigateByUrl(path);
  }

}
