import { TestBed } from '@angular/core/testing';

import { ProfilePostService } from './profile-post.service';

describe('ProfilePostService', () => {
  let service: ProfilePostService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfilePostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
