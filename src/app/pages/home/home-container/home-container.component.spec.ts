import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeContainerComponent } from './home-container.component';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
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

describe('HomeContainerComponent', () => {
  let component: HomeContainerComponent;
  let fixture: ComponentFixture<HomeContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeContainerComponent ],
      providers:[
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        {provide: MATERIAL_SANITY_CHECKS, useValue: false}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
