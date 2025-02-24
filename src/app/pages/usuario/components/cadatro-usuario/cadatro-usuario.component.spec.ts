import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadatroUsuarioComponent } from './cadatro-usuario.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule, FormsModule, FormBuilder } from '@angular/forms';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { CustomValidators } from  '../../../../shared/form-validators/form-validators';
import { CoreModule } from 'src/app/core/core.module';
import { UsuariosService } from 'src/app/core/services/usuario/usuarios.service';
import { of, throwError } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { User } from 'src/app/core/models/user.model';

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

describe('CadatroUsuarioComponent', () => {
  let component: CadatroUsuarioComponent;
  let fixture: ComponentFixture<CadatroUsuarioComponent>;
  let mockUsuariosService: jest.Mocked<UsuariosService>;
  let formBuilder: FormBuilder;
  
  beforeEach(async () => {

    mockUsuariosService = {
      createUser: jest.fn().mockReturnValue(of({})),
    } as any;


    await TestBed.configureTestingModule({
      declarations: [
        CadatroUsuarioComponent,
      ],
      imports:[
        SharedModule,
        CoreModule, 
        HttpClientTestingModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatMomentDateModule,
        MatButtonModule,
        MatTableModule,
        MatPaginatorModule,
        MatIconModule,
        FormsModule,
        MatSelectModule,
        FlexLayoutModule,
        NoopAnimationsModule
        ],
      providers:[
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: UsuariosService, useValue: mockUsuariosService },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadatroUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form on ngOnInit', () => {
    component.ngOnInit();
    expect(component.userRegistrationForm).toBeDefined();
    expect(component.userRegistrationForm.controls['nomeCompleto']).toBeDefined();
    expect(component.userRegistrationForm.controls['email']).toBeDefined();
    expect(component.userRegistrationForm.controls['emailConfirm']).toBeDefined();
    expect(component.userRegistrationForm.controls['celular']).toBeDefined();
    expect(component.userRegistrationForm.controls['dataNascimento']).toBeDefined();
    expect(component.userRegistrationForm.controls['tipoUsuario']).toBeDefined();
  });

  it('should disable emailConfirm control if email is invalid', () => {
    component.ngOnInit();
    const emailControl = component.userRegistrationForm.get('email');
    const emailConfirmControl = component.userRegistrationForm.get('emailConfirm');

    emailControl?.setValue('invalid-email');
    expect(emailConfirmControl?.disabled).toBe(true);

    emailControl?.setValue('valid@example.com');
    expect(emailConfirmControl?.disabled).toBe(false);
  });

  it('should call createUser on form submission if form is valid', () => {
    component.ngOnInit();
    const user: User = {
      nomeCompleto: 'Maria Joaquina',
      email: 'mariaj@example.com',
      celular: '21968814531',
      dataNascimento: '12/10/1998',
      tipoUsuario: 'administrador',
    };

    component.userRegistrationForm.setValue({
      nomeCompleto: user.nomeCompleto,
      email: user.email,
      emailConfirm: user.email,
      celular: user.celular,
      dataNascimento: user.dataNascimento,
      tipoUsuario: user.tipoUsuario,
    });

    component.onSubmit();
    expect(mockUsuariosService.createUser).toHaveBeenCalledWith(user);
  });

  it('should not call createUser if form is invalid', () => {
    component.ngOnInit();
    component.userRegistrationForm.setValue({
      nomeCompleto: 'Ana ',
      email: '',
      emailConfirm: '',
      celular: '',
      dataNascimento: '',
      tipoUsuario: '',
    });

    component.onSubmit();
    expect(mockUsuariosService.createUser).not.toHaveBeenCalled();
  });

  it('should handle error when createUser fails', () => {
    mockUsuariosService.createUser.mockReturnValue(throwError('Error'));
    const consoleSpy = jest.spyOn(console, 'log');

    component.ngOnInit();
    const user: User = {
      nomeCompleto: 'Raimundo Nonato',
      email: 'nonato@example.com',
      celular: '123456789',
      dataNascimento: '1990-01-01',
      tipoUsuario: 'administrador',
    };

    component.userRegistrationForm.setValue({
      nomeCompleto: user.nomeCompleto,
      email: user.email,
      emailConfirm: user.email,
      celular: user.celular,
      dataNascimento: user.dataNascimento,
      tipoUsuario: user.tipoUsuario,
    });

    component.onSubmit();
    expect(consoleSpy).toHaveBeenCalledWith('Formulario nao valido');
  });

  it('should filter input for only numbers', () => {
    const event = { target: { value: 'abc123' } } as unknown as Event;
    component.onlyNumbersFilter(event);
    expect((event.target as HTMLInputElement).value).toBe('123');
  });

  it('should filter input for only letters and accents', () => {
    const event = { target: { value: 'abc123!@#' } } as unknown as Event;
    component.onlyLettersAndAccentFilter(event);
    expect((event.target as HTMLInputElement).value).toBe('abc');
  });

  it('should filter input for email characters', () => {
    const event = { target: { value: 'abc@123!@#' } } as unknown as Event;
    component.emailInputFilter(event);
    expect((event.target as HTMLInputElement).value).toBe('abc@123@');
  });

  it('should filter input for date characters', () => {
    const event = { target: { value: '12/34/5678' } } as unknown as Event;
    component.dateInputFilter(event);
    expect((event.target as HTMLInputElement).value).toBe('12/34/5678');
  });
});
