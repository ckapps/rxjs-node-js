import { MonoTypeOperatorFunction } from 'rxjs';
import { filter } from 'rxjs/operators';

/**
 * Emit values when on one of the given `platforms`.
 *
 * @param platforms Platforms on which emission will pass
 *
 * @returns
 * Observable stream that emits when on one of the allowed `platforms`.
 */
export function filterOnPlatforms(
  platforms: NodeJS.Platform[],
): MonoTypeOperatorFunction<NodeJS.Platform> {
  return filter(platform => platforms.includes(platform));
}
