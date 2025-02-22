import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuarioRoutingModule } from './usuario-routing.module';
import { UsuarioContainerComponent } from './usuario-container/usuario-container.component';
import { CadatroUsuarioComponent } from './components/cadatro-usuario/cadatro-usuario.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoreModule } from 'src/app/core/core.module';
import { ListarUsuarioComponent } from './components/listar-usuario/listar-usuario.component';

import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatIconModule} from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

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
    CoreModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    FormsModule
  ]
})
export class UsuarioModule { }
