import { promises, PathLike } from 'fs';

import { readFile } from './read-file';

describe('readFile', () => {
  const spy = jest.spyOn(promises, 'readFile');

  beforeEach(() => {
    spy.mockClear();
  });

  describe('as buffer', () => {
    beforeEach(() => {
      spy.mockImplementation(async () => 'mock-file-content');
    });

    test.each([
      ['path', undefined],
      ['path', null],
      ['path', {}],
      ['path', { encoding: null }],
      ['path', { flag: 'r' }],
    ])('should pass path %p and options %p', (path, options) => {
      readFile(path, options);
      expect(spy).toBeCalledWith(path, options);
    });
  });

  describe('as string', () => {
    beforeEach(() => {
      spy.mockImplementation(async () => 'mock-file-content');
    });

    test.each([
      ['path', { encoding: 'utf-8' }],
      ['path', { encoding: 'utf-8', flag: 'r' }],
    ] as [PathLike, { encoding: BufferEncoding; flag?: string }][])(
      'should pass path %p and options %p',
      (path, options) => {
        readFile(path, options);
        expect(spy).toBeCalledWith(path, options);
      },
    );
  });
});
