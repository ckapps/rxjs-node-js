import { MonoTypeOperatorFunction } from 'rxjs';
import { filter } from 'rxjs/operators';

/**
 * Emit values when not on one of the given `platforms`.
 *
 * @param platforms Platforms on which emission will not pass
 *
 * @returns
 * Observable stream that emits when not on one of the disallowed `platforms`.
 */
export function filterNotOnPlatforms(
  platforms: NodeJS.Platform[],
): MonoTypeOperatorFunction<NodeJS.Platform> {
  return filter(platform => !platforms.includes(platform));
}
