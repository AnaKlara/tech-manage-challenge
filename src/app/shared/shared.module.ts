import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SelectComponent } from './components/select/select.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { DropdownSidenavComponent } from './components/sidenav/components/dropdown-sidenav/dropdown-sidenav.component';
import { RouterModule } from '@angular/router';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SelectComponent,
    BreadcrumbComponent,
    SidenavComponent,
    DropdownSidenavComponent,
    NotFoundPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule 
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    SelectComponent,
    BreadcrumbComponent,
    SidenavComponent,
    NotFoundPageComponent
  ]
})
export class SharedModule { }
