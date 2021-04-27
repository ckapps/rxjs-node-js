import { TestScheduler } from 'rxjs/testing';
import { filterOnPlatforms } from './filter-on-platforms.operator';

describe('process/operators/filter-on-platforms', () => {
  let testScheduler: TestScheduler;
  const platformMarbles: Record<string, NodeJS.Platform> = {
    a: 'aix',
    b: 'android',
    c: 'cygwin',
    d: 'darwin',
    e: 'freebsd',
    f: 'linux',
    g: 'netbsd',
    h: 'openbsd',
    i: 'sunos',
    j: 'win32',
  };

  beforeEach(() => {
    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  it('should filter on platforms', () => {
    testScheduler.run(({ expectObservable, cold }) => {
      const source$ = cold('(abcdefghij|)', platformMarbles).pipe(
        filterOnPlatforms([platformMarbles.b, platformMarbles.d]),
      );

      const expectedMarble = '(bd|)';
      expectObservable(source$).toBe(expectedMarble, platformMarbles);
    });
  });
});
