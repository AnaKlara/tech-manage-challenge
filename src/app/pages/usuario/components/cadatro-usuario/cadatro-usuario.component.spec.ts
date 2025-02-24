import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadatroUsuarioComponent } from './cadatro-usuario.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CadatroUsuarioComponent', () => {
  let component: CadatroUsuarioComponent;
  let fixture: ComponentFixture<CadatroUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadatroUsuarioComponent ],
      imports:[SharedModule, HttpClientTestingModule,]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadatroUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
