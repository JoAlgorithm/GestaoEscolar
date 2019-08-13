import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagamentoMensalidadesComponent } from './pagamento-mensalidades.component';

describe('PagamentoMensalidadesComponent', () => {
  let component: PagamentoMensalidadesComponent;
  let fixture: ComponentFixture<PagamentoMensalidadesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagamentoMensalidadesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagamentoMensalidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
