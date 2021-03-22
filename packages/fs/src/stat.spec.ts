import { promises } from 'fs';

import { stat } from './stat';

describe('stat', () => {
  const spy = jest.spyOn(promises, 'stat');

  beforeEach(() => {
    spy.mockClear();
  });

  beforeEach(() => {
    spy.mockImplementation(async () => ({
      atime: new Date(),
      atimeMs: 0,
      birthtime: new Date(),
      birthtimeMs: 0,
      blksize: 0,
      blocks: 0,
      ctime: new Date(),
      ctimeMs: 0,
      dev: 0,
      gid: 0,
      ino: 0,
      mode: 0,
      mtime: new Date(),
      mtimeMs: 0,
      nlink: 0,
      rdev: 0,
      size: 0,
      uid: 0,
      isBlockDevice: jest.fn(),
      isCharacterDevice: jest.fn(),
      isDirectory: jest.fn(),
      isFIFO: jest.fn(),
      isFile: jest.fn(),
      isSocket: jest.fn(),
      isSymbolicLink: jest.fn(),
    }));
  });

  test.each([['path'], ['path-2'], [new URL('file:///dev/node')]])(
    'should pass path %p',
    path => {
      const source$ = stat(path);
      expect(spy).not.toBeCalled();
      source$.subscribe();
      expect(spy).toBeCalledWith(path);
    },
  );
});
