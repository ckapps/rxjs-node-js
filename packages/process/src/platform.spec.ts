import { platform$ } from './platform';

describe('process/platform', () => {
  it('should emit platform', () => {
    // Get result
    let resultPlatform: NodeJS.Platform;
    platform$.subscribe(value => {
      resultPlatform = value;
    });

    // Asserts
    // @ts-ignore
    expect(resultPlatform).toBeDefined();
  });
});
