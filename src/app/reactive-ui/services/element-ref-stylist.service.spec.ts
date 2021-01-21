import { TestBed } from '@angular/core/testing';

import { ElementRefStylistService } from './element-ref-stylist.service';

describe('ElementRefStylistService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ElementRefStylistService = TestBed.get(ElementRefStylistService);
    expect(service).toBeTruthy();
  });
});
