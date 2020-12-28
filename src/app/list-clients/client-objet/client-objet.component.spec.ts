import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientObjetComponent } from './client-objet.component';

describe('ClientObjetComponent', () => {
  let component: ClientObjetComponent;
  let fixture: ComponentFixture<ClientObjetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientObjetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientObjetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
