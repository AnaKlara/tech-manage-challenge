import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuarioContainerComponent } from './usuario-container/usuario-container.component';
import { CadatroUsuarioComponent } from './components/cadatro-usuario/cadatro-usuario.component';
import { ListarUsuarioComponent } from './components/listar-usuario/listar-usuario.component';

const routes: Routes = [
  {
    path: '',
    component: UsuarioContainerComponent,
    children:  [
      { path: '', component: ListarUsuarioComponent, pathMatch: 'full' },
      {
        path: 'cadastro',
        component: CadatroUsuarioComponent,
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule { }
