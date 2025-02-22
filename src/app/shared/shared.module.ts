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
import { CelularBrPipe } from './pipes/celular-br/celular-br.pipe';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { CustomMatPaginatorIntl } from './config/am-paginator-config';
import { CelularBrMaskDirective } from './directives/celular-br-mask/celular-br-mask.directive';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    BreadcrumbComponent,
    SidenavComponent,
    DropdownSidenavComponent,
    NotFoundPageComponent,
    SimpleSelectComponent,
    CelularBrPipe,
    CelularBrMaskDirective
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
    SimpleSelectComponent,
    CelularBrPipe,
    CelularBrMaskDirective
  ],
  providers: [{ provide: MatPaginatorIntl, useClass: CustomMatPaginatorIntl }],
})
export class SharedModule { }
