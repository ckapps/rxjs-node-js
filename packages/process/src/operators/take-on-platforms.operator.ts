import { MonoTypeOperatorFunction } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { platform$ } from '../platform';
import { filterNotOnPlatforms } from './filter-not-on-platforms.operator';

export function takeOnPlatforms<T>(
  platforms: NodeJS.Platform[],
): MonoTypeOperatorFunction<T> {
  return takeUntil(platform$.pipe(filterNotOnPlatforms(platforms)));
}
