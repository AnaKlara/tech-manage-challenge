import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { ListarUsuarioComponent } from './listar-usuario.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { SharedModule } from '../../../../shared/shared.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UsuariosService } from '../../../../core/services/usuarios.service';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MATERIAL_SANITY_CHECKS } from '@angular/material/core';

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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListarUsuarioComponent],
      imports:[
        SharedModule,
        MatInputModule,
        MatButtonModule,
        MatTableModule,
        MatPaginatorModule,
        MatIconModule,
        HttpClientTestingModule,
        BrowserAnimationsModule
      ],
      schemas: [NO_ERRORS_SCHEMA],
      providers:[
        UsuariosService,
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
    
    tick();
    fixture.whenStable(); 
    expect(component).toBeTruthy();
  }));
});
