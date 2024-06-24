import { TestBed } from '@angular/core/testing';

import { SecrteryReservationService } from './secrtery-reservation.service';

describe('SecrteryReservationService', () => {
  let service: SecrteryReservationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SecrteryReservationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
