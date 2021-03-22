import { promises, PathLike } from 'fs';

import { appendFile, AppendFileOptions } from './append-file';

describe('append-file', () => {
  const spy = jest.spyOn(promises, 'appendFile');

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
      ['path', data, { flag: 'a' }],
    ])('should pass path %p, data %p and options %p', (path, data, options) => {
      const source$ = appendFile(path, data, options);
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
      ['path', data, { encoding: 'utf-8', flag: 'a' }],
    ] as [PathLike, string, AppendFileOptions][])(
      'should pass path %p, data %p and options %p',
      (path, data, options) => {
        const source$ = appendFile(path, data, options);
        expect(spy).not.toBeCalled();
        source$.subscribe();
        expect(spy).toBeCalledWith(path, data, options);
      },
    );
  });
});
