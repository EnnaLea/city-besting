import { TestBed } from '@angular/core/testing';

import { CacheService } from './cache.service';

describe('CacheService', () => {
  let service: CacheService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CacheService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should save a user in the local cahe', ()=>{
    service.saveUser({
      id?: 1,
      name: 'test',
      email: 'test',
      gender: 'test',
      status: 'test',
      password?: 'test',
      token?: 'test',
    })

    expect(localStorage.getItem('user')).toBeTruthy();
  })

});
