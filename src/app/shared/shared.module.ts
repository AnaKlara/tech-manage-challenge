import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { DropdownSidenavComponent } from './components/sidenav/components/dropdown-sidenav/dropdown-sidenav.component';
import { RouterModule } from '@angular/router';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';
import { CelularBrPipe } from './pipes/celular-br/celular-br.pipe';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { CustomMatPaginatorIntl } from './config/am-paginator-config';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    BreadcrumbComponent,
    SidenavComponent,
    DropdownSidenavComponent,
    NotFoundPageComponent,
    CelularBrPipe,
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
    CelularBrPipe,
  ],
  providers: [{ provide: MatPaginatorIntl, useClass: CustomMatPaginatorIntl }],
})
export class SharedModule { }
