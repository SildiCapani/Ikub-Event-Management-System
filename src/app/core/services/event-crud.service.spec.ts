import { TestBed } from '@angular/core/testing';

import { EventCrudService } from './event-crud.service';

describe('EventCrudService', () => {
  let service: EventCrudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventCrudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
