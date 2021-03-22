import { promises, PathLike } from 'fs';

import { writeFile, WriteFileOptions } from './write-file';

describe('writeFile', () => {
  const spy = jest.spyOn(promises, 'writeFile');

  beforeEach(() => {
    spy.mockClear();
  });

  describe('with Uint8Array', () => {
    const data = new Uint8Array([0]);
    beforeEach(() => {
      spy.mockImplementation(async () => {});
    });

    test.each([
      ['path', data, undefined],
      ['path', data, null],
      ['path', data, {}],
      ['path', data, { encoding: null }],
      ['path', data, { flag: 'w' }],
    ])('should pass path %p, data %p and options %p', (path, data, options) => {
      const source$ = writeFile(path, data, options);
      expect(spy).not.toBeCalled();
      source$.subscribe();
      expect(spy).toBeCalledWith(path, data, options);
    });
  });

  describe('with string', () => {
    const data = 'my-data';
    beforeEach(() => {
      spy.mockImplementation(async () => {});
    });

    test.each([
      ['path', data, { encoding: 'utf-8' }],
      ['path', data, { encoding: 'utf-8', flag: 'w' }],
    ] as [PathLike, string, WriteFileOptions][])(
      'should pass path %p, data %p and options %p',
      (path, data, options) => {
        const source$ = writeFile(path, data, options);
        expect(spy).not.toBeCalled();
        source$.subscribe();
        expect(spy).toBeCalledWith(path, data, options);
      },
    );
  });
});
