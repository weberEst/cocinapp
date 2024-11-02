import { TestBed } from '@angular/core/testing';

import { RecetasbdService } from './recetasbd.service';

describe('RecetasbdService', () => {
  let service: RecetasbdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecetasbdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
