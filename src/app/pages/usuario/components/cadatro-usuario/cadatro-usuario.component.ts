import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SelectOption } from 'src/app/shared/components/form-components/simple-select/select-option.model';
import { atLeastTwoWordsValidator } from 'src/app/shared/form-validators/form-validators';

@Component({
  selector: 'app-cadatro-usuario',
  templateUrl: './cadatro-usuario.component.html',
  styleUrls: ['./cadatro-usuario.component.scss']
})
export class CadatroUsuarioComponent implements OnInit {
  
  userRegistrationForm: FormGroup;

  breadcrumbItems = [
    { label: 'Início', url: '/home' },
    { label: 'Listar usuarios', url: '/usuario' },
    { label: 'Cadastro', url: '' },
  ];

  minDate: Date;
  maxDate: Date;

  roles: SelectOption[] = [
    { value: 'admin', label: 'Administrador' },
    { value: 'editor', label: 'Editor' },
    { value: 'visualizador', label: 'Visualizador' }
  ];

  constructor(private fb: FormBuilder) {
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 120, 0, 1);
    this.maxDate = new Date(currentYear + 1, 11, 31);
  }

  ngOnInit(): void {
    this.generateUserRegistrationForm();
  }

  generateUserRegistrationForm(){
    this.userRegistrationForm = this.fb.group({
      nomeCompleto: ['', [Validators.required, atLeastTwoWordsValidator()]],
      email: ['', [Validators.required, Validators.email]],
      emailConfirm : ['', [Validators.required, Validators.email]],
      celular: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      dataNascimento: ['', Validators.required],
      tipoUsuario: ['', Validators.required]
    },
    { validators: this.matchEmails });
  }

  get isFormInvalid(): boolean {
    return !this.userRegistrationForm.valid;
  }

  get userFC(){
    return this.userRegistrationForm.controls;
  }

  onSubmit(): void {
    if (this.userRegistrationForm.valid) {
      console.log(this.userRegistrationForm.value);
    } else {
      console.log('Formulario nao valido');
    }
  }

  matchEmails(formGroup: AbstractControl) {
    const email = formGroup.get('email')?.value;
    const emailConfirm = formGroup.get('emailConfirm')?.value;
    return email === emailConfirm ? null : { emailMismatch: true };
  }
}
