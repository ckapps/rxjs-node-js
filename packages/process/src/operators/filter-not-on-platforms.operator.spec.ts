import { TestScheduler } from 'rxjs/testing';
import { filterNotOnPlatforms } from './filter-not-on-platforms.operator';

describe('process/operators/filter-not-on-platforms', () => {
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

  it('should filter if not on platforms', () => {
    testScheduler.run(({ expectObservable, cold }) => {
      const source$ = cold('(abcdefghij|)', platformMarbles).pipe(
        filterNotOnPlatforms([platformMarbles.b, platformMarbles.d]),
      );

      const expectedMarble = '(acefghij|)';
      expectObservable(source$).toBe(expectedMarble, platformMarbles);
    });
  });
});
