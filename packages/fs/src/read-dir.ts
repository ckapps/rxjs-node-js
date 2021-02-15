import { promises, Dirent, PathLike } from 'fs';

import { from, Observable } from 'rxjs';

/**
 * Asynchronous readdir(3) - read a directory.
 * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
 * @param options The encoding (or an object specifying the encoding), used as the encoding of the result. If not provided, `'utf8'` is used.
 */
export function readDir(
  path: PathLike,
  options: { encoding: 'buffer'; withFileTypes?: false },
): Observable<Buffer[]>;

/**
 * Asynchronous readdir(3) - read a directory.
 * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
 * @param options The encoding (or an object specifying the encoding), used as the encoding of the result. If not provided, `'utf8'` is used.
 */
export function readDir(
  path: PathLike,
  options?: { encoding?: BufferEncoding; withFileTypes?: false } | null,
): Observable<string[]>;

/**
 * Asynchronous readdir(3) - read a directory.
 * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
 * @param options If called with `withFileTypes: true` the result data will be an array of Dirent.
 */
export function readDir(
  path: PathLike,
  options: { encoding?: BufferEncoding; withFileTypes: true },
): Observable<Dirent[]>;

/**
 *
 * @param path
 * @param options
 */
export function readDir(
  path: PathLike,
  options?: {
    encoding?: BufferEncoding | 'buffer';
    withFileTypes?: boolean;
  } | null,
): Observable<string[] | Buffer[] | Dirent[]> {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return from(promises.readdir(path, options));
}
