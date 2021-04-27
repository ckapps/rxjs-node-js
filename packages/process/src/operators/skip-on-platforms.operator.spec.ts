import { BehaviorSubject } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';

import { skipOnPlatforms } from './skip-on-platforms.operator';

// Prepare mocking
import * as rxjsProcess from '../platform';
jest.mock('../platform');

describe('process/operators/skip-on-platforms', () => {
  let testScheduler: TestScheduler;

  beforeEach(() => {
    // @ts-ignore
    rxjsProcess.platform$ = new BehaviorSubject('aix').asObservable();
  });

  beforeEach(() => {
    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  it('should complete on specified platforms', () => {
    testScheduler.run(({ expectObservable, cold }) => {
      const source$ = cold('(abcd|)').pipe(skipOnPlatforms(['aix']));

      const expectedMarble = '(|)';
      expectObservable(source$).toBe(expectedMarble);
    });
  });

  it('should not skip on other platforms', () => {
    testScheduler.run(({ expectObservable, cold }) => {
      const source$ = cold('(abcd|)').pipe(skipOnPlatforms(['android']));

      const expectedMarble = '(abcd|)';
      expectObservable(source$).toBe(expectedMarble);
    });
  });
});
