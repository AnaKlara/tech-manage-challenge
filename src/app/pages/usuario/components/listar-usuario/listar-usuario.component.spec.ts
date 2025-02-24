import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { ListarUsuarioComponent } from './listar-usuario.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { SharedModule } from '../../../../shared/shared.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UsuariosService } from '../../../../core/services/usuario/usuarios.service';
import { of, throwError } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MATERIAL_SANITY_CHECKS } from '@angular/material/core';
import { CoreModule } from 'src/app/core/core.module';
import { User } from 'src/app/core/models/user.model';
import * as db from '../../../../../../mock-data/db.json';


const mockActivatedRoute = {
  snapshot: {
    paramMap: {
      get: (key: string) => {
        return 'mockValue';
      },
    },
  },
  params: of({ id: 'mockId' }),
};

describe('ListarUsuarioComponent', () => {
  let component: ListarUsuarioComponent;
  let fixture: ComponentFixture<ListarUsuarioComponent>;
  let mockUsuariosService: jest.Mocked<UsuariosService>;

  const mockUsers: User[] = db.users.slice(0, 10);

  beforeEach(async () => {

    mockUsuariosService = {
      getUsers: jest.fn().mockReturnValue(of({ data: mockUsers, items: mockUsers.length })),
      deleteUser: jest.fn().mockReturnValue(of({})),
    } as any;


    await TestBed.configureTestingModule({
      declarations: [ListarUsuarioComponent],
      imports:[
        SharedModule,
        CoreModule,
        MatInputModule,
        MatButtonModule,
        MatTableModule,
        MatPaginatorModule,
        MatIconModule,
        HttpClientTestingModule,
        NoopAnimationsModule
      ],
      schemas: [NO_ERRORS_SCHEMA],
      providers:[
        { provide: UsuariosService, useValue: mockUsuariosService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        {provide: MATERIAL_SANITY_CHECKS, useValue: false}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', fakeAsync (() => {
    expect(component).toBeTruthy();
  }));

  it('should initialize with default values', () => {
    expect(component.breadcrumbItems.length).toBe(2);
    expect(component.searchTableInput).toBe('');
    expect(component.displayedColumns).toEqual(['nomeCompleto', 'email', 'celular', 'dataNascimento', 'tipoUsuario', 'action']);
    expect(component.currentPage).toBe(1);
    expect(component.pageSize).toBe(5);
    expect(component.totalUsers).toBe(10);
  });

  it('should call buscarPaginaUsuarios on init', () => {
    const buscarPaginaUsuariosSpy = jest.spyOn(component, 'buscarPaginaUsuarios');
    component.ngOnInit();
    expect(buscarPaginaUsuariosSpy).toHaveBeenCalledWith(1, 5);
  });

  it('should fetch users and update dataSource on buscarPaginaUsuarios', () => {
    component.buscarPaginaUsuarios(1, 5);
    expect(mockUsuariosService.getUsers).toHaveBeenCalledWith(1, 5);
    expect(component.users).toEqual(mockUsers);
    expect(component.dataSource.data).toEqual(mockUsers);
    expect(component.totalUsers).toBe(mockUsers.length);
  });

  it('should handle page event and call buscarPaginaUsuarios', () => {
    const pageEvent: PageEvent = { pageIndex: 1, pageSize: 5, length: 10 };
    const buscarPaginaUsuariosSpy = jest.spyOn(component, 'buscarPaginaUsuarios');
    component.handlePageEvent(pageEvent);
    expect(buscarPaginaUsuariosSpy).toHaveBeenCalledWith(2, 5);
  });

  it('should apply filter to dataSource', () => {
    const filterValue = 'Raimundo';
    const event = { target: { value: filterValue } } as unknown as Event;
    component.dataSource = new MatTableDataSource(mockUsers);
    component.applyFilter(event);
    expect(component.dataSource.filter).toBe(filterValue.trim().toLowerCase());
  });

  it('should delete user and refresh user list', () => {
    const userId = '1';
    component.deleteUser(userId);
    expect(mockUsuariosService.deleteUser).toHaveBeenCalledWith(userId);
    expect(mockUsuariosService.getUsers).toHaveBeenCalledWith(1, 5);
  });

});
