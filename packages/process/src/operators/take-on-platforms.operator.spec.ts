import { BehaviorSubject } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';

import { takeOnPlatforms } from './take-on-platforms.operator';

// Prepare mocking
import * as rxjsProcess from '../platform';
jest.mock('../platform');

describe('process/operators/take-on-platforms', () => {
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

  it('should take on specified platforms', () => {
    testScheduler.run(({ expectObservable, cold }) => {
      const source$ = cold('(abcdefghij|)').pipe(takeOnPlatforms(['aix']));

      const expectedMarble = '(abcdefghij|)';
      expectObservable(source$).toBe(expectedMarble);
    });
  });

  it('should not take on other platforms', () => {
    testScheduler.run(({ expectObservable, cold }) => {
      const source$ = cold('(abcdefghij|)').pipe(takeOnPlatforms(['android']));

      const expectedMarble = '(|)';
      expectObservable(source$).toBe(expectedMarble);
    });
  });
});
