import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/models/user.model';
import { UsuariosService } from 'src/app/core/services/usuario/usuarios.service';
import {MatTableDataSource} from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-listar-usuario',
  templateUrl: './listar-usuario.component.html',
  styleUrls: ['./listar-usuario.component.scss']
})
export class ListarUsuarioComponent implements OnInit {

  breadcrumbItems = [
    { label: 'Início', url: '/home' },
    { label: 'Listar usuarios', url: '/usuario' },
  ];

  searchTableInput: string = "";

  displayedColumns: string[] = ["nomeCompleto","email","celular","dataNascimento","tipoUsuario", "action"];
  dataSource!: MatTableDataSource<User>;

  users: User[] = [];
  currentPage: number = 1;
  pageSize: number = 5;
  totalUsers = 0;
  
  constructor(private usuariosService: UsuariosService) {
  }

  ngOnInit(): void {
    this.buscarPaginaUsuarios(this.currentPage, this.pageSize);
  }

  buscarPaginaUsuarios(page: number, size: number): void {
    this.usuariosService.getUsers(page, size).subscribe(response => {
      this.users = response.data;
      this.dataSource = new MatTableDataSource<User>(response.data)
      this.totalUsers = response.items;
      this.currentPage = page;
    });
  }

  handlePageEvent($event: PageEvent){
    this.buscarPaginaUsuarios($event.pageIndex+1, this.pageSize);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteUser(id: string) {
    this.usuariosService.deleteUser(id).subscribe(
      response => {
        this.buscarPaginaUsuarios(this.currentPage, this.pageSize);
      }
    )
  }

}
