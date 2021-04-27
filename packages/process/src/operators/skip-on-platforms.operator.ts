import { MonoTypeOperatorFunction } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { platform$ } from '../platform';
import { filterOnPlatforms } from './filter-on-platforms.operator';

/**
 * Emits values if the current node.js process doesn't run on one of
 * the given `platforms`.
 *
 * @param platforms Platforms that are not allowed
 *
 * @returns
 * Observable stream that emits if not on one of the given platforms.
 * If on one of the given platforms, the observable completes.
 */
export function skipOnPlatforms<T>(
  platforms: NodeJS.Platform[],
): MonoTypeOperatorFunction<T> {
  return takeUntil(platform$.pipe(filterOnPlatforms(platforms)));
}
