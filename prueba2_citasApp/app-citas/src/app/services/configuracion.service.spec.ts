import { TestBed } from '@angular/core/testing';

import { ConfigurationServices } from './configuracion.service';

describe('ConfigurationServices', () => {
  let service: ConfigurationServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfigurationServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
