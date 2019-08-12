import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaEstudanteComponent } from './lista-estudante.component';

describe('ListaEstudanteComponent', () => {
  let component: ListaEstudanteComponent;
  let fixture: ComponentFixture<ListaEstudanteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaEstudanteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaEstudanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
