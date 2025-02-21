import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuarioRoutingModule } from './usuario-routing.module';
import { UsuarioContainerComponent } from './usuario-container/usuario-container.component';
import { CadatroUsuarioComponent } from './components/cadatro-usuario/cadatro-usuario.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoreModule } from 'src/app/core/core.module';
import { ListarUsuarioComponent } from './components/listar-usuario/listar-usuario.component';


@NgModule({
  declarations: [
    UsuarioContainerComponent,
    CadatroUsuarioComponent,
    ListarUsuarioComponent
  ],
  imports: [
    CommonModule,
    UsuarioRoutingModule,
    SharedModule,
    CoreModule
  ]
})
export class UsuarioModule { }
