import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeContainerComponent } from './home-container.component';
import { MATERIAL_SANITY_CHECKS } from '@angular/material/core';

describe('HomeContainerComponent', () => {
  let component: HomeContainerComponent;
  let fixture: ComponentFixture<HomeContainerComponent>;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeContainerComponent ],
      providers:[
        {provide: MATERIAL_SANITY_CHECKS, useValue: false},
      ],
      imports:[

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
