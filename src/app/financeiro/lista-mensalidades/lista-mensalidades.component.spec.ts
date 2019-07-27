import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaMensalidadesComponent } from './lista-mensalidades.component';

describe('ListaMensalidadesComponent', () => {
  let component: ListaMensalidadesComponent;
  let fixture: ComponentFixture<ListaMensalidadesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaMensalidadesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaMensalidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
