/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ToggleSidebarService } from './ham-press-broadcaster.service';

describe('HamPressBroadcasterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ToggleSidebarService]
    });
  });

  it('should ...', inject([ToggleSidebarService], (service: ToggleSidebarService) => {
    expect(service).toBeTruthy();
  }));
});
