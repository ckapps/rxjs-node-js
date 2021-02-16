import * as fs from 'fs';
import { take } from 'rxjs/operators';

import { watch, WatchChangeEvent, WatchError, WatchRenameEvent } from './watch';

jest.mock('fs');

describe('watch', () => {
  const spy = jest.spyOn(fs, 'watch');

  beforeEach(() => {
    spy.mockClear();
  });

  describe('errors', () => {
    it('should create error', () => {
      const path = 'test';
      const innerError = new Error('inner error');
      const error = new WatchError(path, innerError);

      expect(error).toBeDefined();
      expect(error.error).toBe(innerError);
      expect(error.path).toBe(path);
    });
  });

  describe('events', () => {
    const filename = 'test';

    it('should create rename event', () => {
      const e = new WatchRenameEvent(filename);
      expect(e).toBeDefined();
      expect(e.event).toBe('rename');
      expect(e.filename).toBe(filename);
    });

    it('should create change event', () => {
      const e = new WatchChangeEvent(filename);
      expect(e).toBeDefined();
      expect(e.event).toBe('change');
      expect(e.filename).toBe(filename);
    });
  });

  describe('watch', () => {
    let closeCallback: () => void;
    let errorCallback: () => void;
    let changeCallback: (event: 'change' | 'rename', filename: string) => void;

    const mockWatcher = {
      removeAllListeners: jest.fn(),
      close: jest.fn(),
      once: jest.fn().mockImplementation((event, cb) => {
        if (event === 'close') {
          closeCallback = cb;
        } else if (event === 'error') {
          errorCallback = cb;
        }
      }),
    };

    beforeEach(() => {
      spy.mockImplementation(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        // @ts-ignore
        (path: fs.PathLike, options: any, callback: () => void) => {
          changeCallback = callback;
          //
          return mockWatcher;
        },
      );
    });

    it('should set callbacks', () => {
      watch('path', { encoding: 'utf-8' }).subscribe();

      expect(changeCallback).toBeDefined();
      expect(closeCallback).toBeDefined();
      expect(errorCallback).toBeDefined();
    });

    it('should complete on close', () => {
      const sub = watch('path', { encoding: 'utf-8' }).subscribe();

      closeCallback();

      expect(sub.closed).toBe(true);
    });

    it('should throw on error', done => {
      watch('path', { encoding: 'utf-8' }).subscribe(
        () => {},
        error => {
          expect(error).toBeDefined();
          done();
        },
      );

      errorCallback();
    });

    it('should emit change', done => {
      watch('path', { encoding: 'utf-8' })
        .pipe(take(1))
        .subscribe(event => {
          expect(event).toBeDefined();
          expect(event instanceof WatchChangeEvent).toBe(true);
          done();
        });

      changeCallback('change', 'file');
    });

    it('should emit rename', done => {
      watch('path', { encoding: 'utf-8' })
        .pipe(take(1))
        .subscribe(event => {
          expect(event).toBeDefined();
          expect(event instanceof WatchRenameEvent).toBe(true);
          done();
        });

      changeCallback('rename', 'file');
    });
  });
});
