import { TestBed } from '@angular/core/testing';

import { Avisos } from './servicio-avisos';

describe('Avisos', () => {
  let service: Avisos;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Avisos);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
