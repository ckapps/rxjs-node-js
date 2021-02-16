import { promises, PathLike } from 'fs';
import { from, Observable } from 'rxjs';

/**
 * @param path Path to the file
 * @param options Options for specifying the encoding and flag
 *
 * @returns
 * An observable that emits with the content of a file
 */
export function readFile(
  path: PathLike,
  options?: { encoding?: null; flag?: string } | undefined | null,
): Observable<Buffer>;

/**
 * @param path Path to the file
 * @param options Options for specifying the encoding and flag
 *
 * @returns
 * An observable that emits with the content of a file
 */
export function readFile(
  path: PathLike,
  options: { encoding: BufferEncoding; flag?: string },
): Observable<string>;

/**
 * @param path Path to the file
 * @param options Options for specifying the encoding and flag
 *
 * @returns
 * An observable that emits with the content of a file
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
