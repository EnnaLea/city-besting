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

  
  it('should save the user in the localstorage', () => {
    const user = {
        id: 1,
        name: 'test',
        email: 'test',
        gender: 'test',
        status: 'test'
    };
    service.saveUser(user);
    const savedUser = service.getUserSaved();
    expect(savedUser).toEqual(user);
});

  it('should get the saved user in the localstorage', () => {
    const user = {
      id: 1,
      name: 'test',
      email: 'test',
      gender: 'test',
      status: 'test',
      password: 'test',
      token: 'test',
    };
    service.saveUser(user);
    const savedUser = service.getUserSaved();
    expect(savedUser).toEqual(user);
});

it('should delete the saved user in the localstorage', () => {
  const user = {
      id: 1,
      name: 'test',
      email: 'test',
      gender: 'test',
      status: 'test'
  };
  service.saveUser(user);
  service.deleteSavedUser();
  const savedUser = service.getUserSaved();
  expect(savedUser).toBeNull();
});

});
