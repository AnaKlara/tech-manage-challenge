import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { DropdownSidenavComponent } from './components/sidenav/components/dropdown-sidenav/dropdown-sidenav.component';
import { RouterModule } from '@angular/router';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';
import { SimpleSelectComponent } from './components/form-components/simple-select/simple-select.component';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    BreadcrumbComponent,
    SidenavComponent,
    DropdownSidenavComponent,
    NotFoundPageComponent,
    SimpleSelectComponent
  ],
  imports: [
    CommonModule,
    RouterModule 
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    BreadcrumbComponent,
    SidenavComponent,
    NotFoundPageComponent,
    SimpleSelectComponent
  ]
})
export class SharedModule { }
