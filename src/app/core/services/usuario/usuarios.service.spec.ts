import { TestBed } from '@angular/core/testing';

import { UsuariosService } from './usuarios.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { User } from '../../models/user.model';
import { UserListPage } from '../../models/user-list-page.model';

describe('UsuariosService', () => {
  let service: UsuariosService;
  let httpMock: HttpTestingController;
  const apiUrl = 'http://localhost:3000/users';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule
      ],
      providers: [UsuariosService],
    });
    service = TestBed.inject(UsuariosService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should fetch users with pagination', () => {
    const dummyUsers: UserListPage = {
      data: [{
        id: "1", nomeCompleto: 'Raimundo Nonato', email: 'rnonat@example.com',
        celular: '21968814531',
        dataNascimento: '1998-10-12',
        tipoUsuario: 'editor'
      }], items: 1,
      first: 0,
      prev: null,
      next: null,
      last: 0,
      pages: 0
    };
    service.getUsers(1, 10).subscribe(users => {
      expect(users).toEqual(dummyUsers);
    });
    const req = httpMock.expectOne(`${apiUrl}?_page=1&_per_page=10`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyUsers);
  });

  it('should fetch user by ID', () => {
    const dummyUser: User = {
      id: "1", nomeCompleto: 'Raimundo Nonato', email: 'rnonat@example.com',
      celular: '21968814531',
      dataNascimento: '1998-10-12',
      tipoUsuario: 'editor'
    };
    service.getUserById(1).subscribe(user => {
      expect(user).toEqual(dummyUser);
    });
    const req = httpMock.expectOne(`${apiUrl}/1`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyUser);
  });

  it('should create a user', () => {
    const newUser: User = {
      id: "1", nomeCompleto: 'Raimundo Nonato', email: 'rnonat@example.com',
      celular: '21968814531',
      dataNascimento: '1998-10-12',
      tipoUsuario: 'editor'
    };
    service.createUser(newUser).subscribe(user => {
      expect(user).toEqual(newUser);
    });
    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('POST');
    req.flush(newUser);
  });

  it('should update a user', () => {
    const updatedUser: User = {
      id: "1", nomeCompleto: 'Raimundo Nonato', email: 'rnonat@example.com',
      celular: '21968814531',
      dataNascimento: '1998-10-12',
      tipoUsuario: 'editor'
    };
    service.updateUser(1, updatedUser).subscribe(user => {
      expect(user).toEqual(updatedUser);
    });
    const req = httpMock.expectOne(`${apiUrl}/1`);
    expect(req.request.method).toBe('PUT');
    req.flush(updatedUser);
  });

  it('should delete a user', () => {
    service.deleteUser('1').subscribe(response => {
      expect(response).toBeUndefined();
    });
    const req = httpMock.expectOne(`${apiUrl}/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});
