import { PathLike, promises, WriteFileOptions } from 'fs';
import { defer, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export type AppendFileOptions = WriteFileOptions;

interface AppendFileResult<T = string | Uint8Array> {
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
export function appendFile(
  path: PathLike,
  data: string,
): Observable<AppendFileResult<string>>;

/**
 * Writes the given `data` to `path`.
 *
 * @param path The path to which should be written
 * @param data The data which should be written
 *
 * @returns
 * An observable that emits when writing is done.
 */
export function appendFile(
  path: PathLike,
  data: Uint8Array,
): Observable<AppendFileResult<Uint8Array>>;

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
export function appendFile(
  path: PathLike,
  data: string,
  options?: AppendFileOptions | null,
): Observable<AppendFileResult<string>>;

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
export function appendFile(
  path: PathLike,
  data: Uint8Array,
  options?: AppendFileOptions | null,
): Observable<AppendFileResult<Uint8Array>>;

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
export function appendFile(
  path: PathLike,
  data: string | Uint8Array,
  options?: AppendFileOptions | null,
): Observable<AppendFileResult> {
  return defer(() => promises.appendFile(path, data, options)).pipe(
    map(() => ({ path, data })),
  );
}
