import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadatroUsuarioComponent } from './cadatro-usuario.component';

describe('CadatroUsuarioComponent', () => {
  let component: CadatroUsuarioComponent;
  let fixture: ComponentFixture<CadatroUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadatroUsuarioComponent ]
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
