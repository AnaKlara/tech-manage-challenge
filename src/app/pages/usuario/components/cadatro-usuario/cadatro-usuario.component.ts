import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cadatro-usuario',
  templateUrl: './cadatro-usuario.component.html',
  styleUrls: ['./cadatro-usuario.component.scss']
})
export class CadatroUsuarioComponent implements OnInit {
  
  userRegistrationForm: FormGroup;

  breadcrumbItems = [
    { label: 'Início', url: '/home' },
    { label: 'Cadastro', url: '' },
  ];

  roles = [
    { value: 'admin', label: 'Administrador' },
    { value: 'editor', label: 'Editor' },
    { value: 'visualizador', label: 'Visualizador' }
  ];

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.generateUserRegistrationForm();
  }

  generateUserRegistrationForm(){
    this.userRegistrationForm = this.fb.group({
      nomeCompleto: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      celular: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      dataNascimento: ['', Validators.required],
      tipoUsuario: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.userRegistrationForm.valid) {
      console.log(this.userRegistrationForm.value);
    } else {
      console.log('Formulario nao valido');
    }
  }
}
