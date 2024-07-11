import { TestBed } from '@angular/core/testing';

import { LocalstoreageService } from './localstoreage.service';

describe('LocalstoreageService', () => {
  let service: LocalstoreageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalstoreageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
