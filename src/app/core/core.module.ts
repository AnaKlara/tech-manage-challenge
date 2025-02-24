import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { UsuariosService } from './services/usuario/usuarios.service';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CoreRoutingModule,
    HttpClientModule,
  ],
  providers:[
    UsuariosService
  ]
})
export class CoreModule { }
