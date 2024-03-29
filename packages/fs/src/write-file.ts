import { PathLike, promises, WriteFileOptions } from 'fs';
import { defer, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export { WriteFileOptions };

interface WriteFileResult<T = string | Uint8Array> {
  /**
   * The path to which the file was written
   */
  path: PathLike;
  /**
   * The data that was writte
   */
  data: T;
}

/**
 * Writes the given `data` to `path`.
 *
 * @param path The path to which should be written
 * @param data The data which should be written
 *
 * @returns
 * An observable that emits when writing is done.
 */
export function writeFile(
  path: PathLike,
  data: string,
): Observable<WriteFileResult<string>>;

/**
 * Writes the given `data` to `path`.
 *
 * @param path The path to which should be written
 * @param data The data which should be written
 *
 * @returns
 * An observable that emits when writing is done.
 */
export function writeFile(
  path: PathLike,
  data: Uint8Array,
): Observable<WriteFileResult<Uint8Array>>;

/**
 * Writes the given `data` to `path` with the specified `options`.
 *
 * @param path The path to which should be written
 * @param data The data which should be written
 * @param options The options to specify
 *
 * @returns
 * An observable that emits when writing is done.
 */
export function writeFile(
  path: PathLike,
  data: string,
  options?: WriteFileOptions | null,
): Observable<WriteFileResult<string>>;

/**
 * Writes the given `data` to `path` with the specified `options`.
 *
 * @param path The path to which should be written
 * @param data The data which should be written
 * @param options The options to specify
 *
 * @returns
 * An observable that emits when writing is done.
 */
export function writeFile(
  path: PathLike,
  data: Uint8Array,
  options?: WriteFileOptions | null,
): Observable<WriteFileResult<Uint8Array>>;

/**
 * Writes the given `data` to `path` with the specified `options`.
 *
 * @param path The path to which should be written
 * @param data The data which should be written
 * @param options The options to specify
 *
 * @returns
 * An observable that emits when writing is done.
 */
export function writeFile(
  path: PathLike,
  data: string | Uint8Array,
  options?: WriteFileOptions | null,
): Observable<WriteFileResult> {
  return defer(() => promises.writeFile(path, data, options)).pipe(
    map(() => ({ path, data })),
  );
}
