import { TestBed } from '@angular/core/testing';

import { ResellVintedService } from './resell-vinted.service';

describe('ResellVintedService', () => {
  let service: ResellVintedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResellVintedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
