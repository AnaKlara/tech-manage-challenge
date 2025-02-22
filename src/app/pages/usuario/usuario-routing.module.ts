import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadatroUsuarioComponent } from './components/cadatro-usuario/cadatro-usuario.component';
import { ListarUsuarioComponent } from './components/listar-usuario/listar-usuario.component';

const routes: Routes = [
  { path: '', redirectTo: 'listar', pathMatch: 'full' },
  { path: 'listar', component: ListarUsuarioComponent, pathMatch: 'full' },
  {
    path: 'cadastrar',
    component: CadatroUsuarioComponent,
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule { }
