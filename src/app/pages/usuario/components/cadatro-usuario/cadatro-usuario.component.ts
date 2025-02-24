import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { SelectOption } from 'src/app/shared/model/select-option.model';
import { CustomValidators } from 'src/app/shared/form-validators/form-validators';
import * as _moment from 'moment';
import { UsuariosService } from 'src/app/core/services/usuario/usuarios.service';
import { UserMapper } from 'src/app/core/mapers/user.mapper';
import { User } from 'src/app/core/models/user.model';

@Component({
  selector: 'app-cadatro-usuario ',
  templateUrl: './cadatro-usuario.component.html',
  styleUrls: ['./cadatro-usuario.component.scss']
})
export class CadatroUsuarioComponent implements OnInit {
  
  userRegistrationForm!: FormGroup;

  breadcrumbItems = [
    { label: 'Início', url: '/home' },
    { label: 'Listar usuarios', url: '/usuario' },
    { label: 'Cadastro', url: '' },
  ];

  minDate: Date;
  maxDate: Date;
  startYear : Date =  _moment().subtract(18, 'years').startOf('year').toDate();

  roles: SelectOption[] = [
    { value: 'administrador', label: 'Administrador' },
    { value: 'editor', label: 'Editor' },
    { value: 'visualizador', label: 'Visualizador' }
  ];

  constructor(
    private fb: FormBuilder, 
    private usuariosService: UsuariosService ) {
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(new Date().getFullYear() - 120, 0, 1);
    this.maxDate = new Date(new Date().getFullYear() - 18, -1, -1);
  }

  ngOnInit(): void {
    this.generateUserRegistrationForm();
  }

  get isFormInvalid(): boolean {
    return !this.userRegistrationForm.valid;
  }

  get userFC(){
    return this.userRegistrationForm.controls;
  }
  get isEmailConfirmDisabled(){
    return this.userRegistrationForm.controls['email'].value === null;
  }

  generateUserRegistrationForm(){
    this.userRegistrationForm = this.fb.group({
      nomeCompleto: ['', [Validators.required, CustomValidators.atLeastTwoWords()]],
      email: ['', [Validators.required, Validators.email]],
      emailConfirm : [{ value: '', disabled: true }, [Validators.required, Validators.email, CustomValidators.matchEmailConfirm('email')]],
      celular: ['', [Validators.required, CustomValidators.brazilianPhoneNumber()]],
      dataNascimento: ['', 
        [
          Validators.required,
          CustomValidators.dateFormat(),
          CustomValidators.minAge(18),
          CustomValidators.maxAge(100),
      ]
      ],
      tipoUsuario: ['', Validators.required]
    });

    this.userRegistrationForm.get('email')?.valueChanges.subscribe(() => {
      const emailControl = this.userRegistrationForm.get('email');
      const emailConfirmControl = this.userRegistrationForm.get('emailConfirm');

      if (emailControl?.invalid) {
        emailConfirmControl?.disable();
      } else {
        emailConfirmControl?.enable();
      }
    });
  }

  onSubmit(): void {
    if (this.userRegistrationForm.valid) {
      console.log(this.userRegistrationForm.value);
      this.salvarCadastroDeUsuario();
    } else {
      console.log('Formulario nao valido');
    }
  }

  salvarCadastroDeUsuario(){
    const userMapper = new UserMapper();
    const user: User = userMapper.mapFrom(this.userRegistrationForm.value);

    this.usuariosService.createUser(user).subscribe({
      next: (value: User) => {
        console.log('um novo valor recebido', value);
      },
      error: (err: any) => {
        console.log('Algum erro');
      },
      complete: () => {
        console.log('Operacao completa');
      }
    });
  }

  matchEmails(control: AbstractControl): ValidationErrors | null {
    const email = control.get('email');
    const emailConfirm = control.get('emailConfirm');
  
    if (email && emailConfirm && email.value !== emailConfirm.value) {
      return { matchEmails: true };
    }
  
    return null;
  }

  onlyNumbersFilter(event: Event):void {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/[^0-9]/g,'');
  }

  onlyLettersAndAccentFilter(event: Event):void {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/[^A-Za-zÀ-ÿ\s]+/g, '');
  }

  emailInputFilter(event: Event):void {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/[^A-Za-z0-9@.]/g, '');
  }

  dateInputFilter(event: Event):void {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/[^0-9/]/g, '');
  }

  adultAgeAndMinAge(d: Date | null): boolean  {
    const currentYear = new Date().getFullYear();
    const maxDate = new Date(currentYear - 18, 0, 1);
    const minDate = new Date(new Date().getFullYear() - 100, 0, 1);

    return d! < maxDate && d! > minDate;
  };

}
