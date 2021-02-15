import { promises, PathLike } from 'fs';
import { from, Observable } from 'rxjs';

/**
 *
 * @param path
 * @param options
 */
export function readFile(
  path: PathLike,
  options?: { encoding?: null; flag?: string } | undefined | null,
): Observable<Buffer>;

/**
 * Asynchronously reads the entire contents of a file.
 * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
 * URL support is _experimental_.
 * If a file descriptor is provided, the underlying file will _not_ be closed automatically.
 * @param options Either the encoding for the result, or an object that contains the encoding and an optional flag.
 * If a flag is not provided, it defaults to `'r'`.
 */
export function readFile(
  path: PathLike,
  options: { encoding: BufferEncoding; flag?: string },
): Observable<string>;

/**
 *
 * @param path
 * @param options
 */
export function readFile(
  path: PathLike,
  options?:
    | { encoding?: BufferEncoding | null; flag?: string }
    | undefined
    | null,
): Observable<string | Buffer> {
  return from(promises.readFile(path, options));
}
