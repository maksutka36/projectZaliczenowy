import { TestBed } from '@angular/core/testing';

import { UsersManagmentService } from './users-managment.service';

describe('UsersManagmentService', () => {
  let service: UsersManagmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsersManagmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
