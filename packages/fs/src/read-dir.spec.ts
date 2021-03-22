import { promises } from 'fs';

import { readDir } from './read-dir';

describe('readDir', () => {
  const spy = jest.spyOn(promises, 'readdir');

  beforeEach(() => {
    spy.mockClear();
  });

  describe('as string', () => {
    const mockReturnValues: any = ['file1', 'file2', 'dir1', 'dir2'];
    beforeEach(() => {
      spy.mockImplementation(async () => mockReturnValues);
    });

    test.each([
      ['path', undefined],
      ['path', null],
      ['path', { withFileTypes: false }],
      ['path', { encoding: 'utf-8', withFileTypes: false }],
    ])('should pass path %p and options %p', (path, options: any) => {
      const source$ = readDir(path, options);
      expect(spy).not.toBeCalled();
      source$.subscribe();
      expect(spy).toBeCalledWith(path, options);
    });
  });

  describe('as buffer', () => {
    // @ts-ignore
    const buffer: Buffer = {};
    const mockReturnValues: any = [buffer];
    beforeEach(() => {
      spy.mockImplementation(async () => mockReturnValues);
    });

    test.each([
      // As buffer
      ['path', { encoding: 'buffer' }],
      ['path', { encoding: 'buffer', withFileTypes: false }],
    ])('should pass path %p and options %p', (path, options: any) => {
      readDir(path, options);
      const source$ = readDir(path, options);
      expect(spy).not.toBeCalled();
      source$.subscribe();
      expect(spy).toBeCalledWith(path, options);
    });
  });

  describe('as dirent', () => {
    test.each([
      ['path', { withFileTypes: true }],
      ['more-path', { withFileTypes: true }],
    ])('should pass path %p and options %p', (path, options: any) => {
      readDir(path, options);
      const source$ = readDir(path, options);
      expect(spy).not.toBeCalled();
      source$.subscribe();
      expect(spy).toBeCalledWith(path, options);
    });
  });
});
