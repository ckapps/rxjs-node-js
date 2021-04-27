import { MonoTypeOperatorFunction } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { platform$ } from '../platform';
import { filterNotOnPlatforms } from './filter-not-on-platforms.operator';

/**
 * Emits values if the current node.js process runs on one of
 * the given `platforms`.
 *
 * @param platforms Platforms that are allowed
 *
 * @returns
 * Observable stream that emits if on one of the given platforms.
 * If not on one of the given platforms, the observable completes.
 */
export function takeOnPlatforms<T>(
  platforms: NodeJS.Platform[],
): MonoTypeOperatorFunction<T> {
  return takeUntil(platform$.pipe(filterNotOnPlatforms(platforms)));
}
