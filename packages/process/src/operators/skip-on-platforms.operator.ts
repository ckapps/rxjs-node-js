import { MonoTypeOperatorFunction } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { platform$ } from '../platform';
import { filterOnPlatforms } from './filter-on-platforms.operator';

export function skipOnPlatforms<T>(
  platforms: NodeJS.Platform[],
): MonoTypeOperatorFunction<T> {
  return takeUntil(platform$.pipe(filterOnPlatforms(platforms)));
}
