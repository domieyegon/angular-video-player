import { TestBed } from '@angular/core/testing';

import { UploadVideoService } from './upload-video.service';

describe('UploadVideoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UploadVideoService = TestBed.get(UploadVideoService);
    expect(service).toBeTruthy();
  });
});
