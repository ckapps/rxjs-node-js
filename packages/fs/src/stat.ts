import { promises, PathLike } from 'fs';
import { defer } from 'rxjs';

/**
 * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
 *
 * @returns
 * An observable that emits with the file status for the given `path`.
 */
export function stat(path: PathLike) {
  return defer(() => promises.stat(path));
}
