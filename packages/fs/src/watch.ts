import { watch as _watch, PathLike } from 'fs';
import { Observable } from 'rxjs';

/**
 * Options for `watch`
 */
export interface WatchOptions<T extends string> {
  encoding: T;
  persistent?: boolean;
  recursive?: boolean;
}

/**
 * Error that may occuring during watching
 */
export class WatchError<T extends PathLike> extends Error {
  constructor(
    /**
     * Path that was watched
     */
    public readonly path: T,
    /**
     * Actual error
     */
    public readonly error: Error,
  ) {
    super(`Error watching ${path}`);
  }
}

/**
 * Event object
 */
export class WatchEvent<T = string | Buffer> {
  constructor(
    /**
     * The event type
     */
    public readonly event: 'change' | 'rename',
    /**
     * The associated file
     */
    public readonly filename: T,
  ) {}
}

/**
 * Event object used in case of a rename event
 */
export class WatchRenameEvent<T> extends WatchEvent<T> {
  constructor(readonly filename: T) {
    super('rename', filename);
  }
}

/**
 * Event object used in case if a file was changed
 */
export class WatchChangeEvent<T> extends WatchEvent<T> {
  constructor(readonly filename: T) {
    super('change', filename);
  }
}

export function watch(
  path: PathLike,
  options: WatchOptions<'buffer'>,
): Observable<WatchEvent<Buffer>>;

export function watch(
  path: PathLike,
  options: WatchOptions<BufferEncoding>,
): Observable<WatchEvent<string>>;

/**
 * Watches the given `path`.
 *
 * @param path The path to watch
 * @param options The options for watching
 *
 * @returns
 * An observable that emits with one of the following events
 * - `WatchChangeEvent`
 * - `WatchRenameEvent`
 *
 * In case of an error, an instance of `WatchError` is emitted.
 */
export function watch(
  path: PathLike,
  options: WatchOptions<BufferEncoding> | WatchOptions<'buffer'>,
): Observable<WatchEvent> {
  return new Observable(observer => {
    const watcher = _watch(
      path,
      options as WatchOptions<BufferEncoding>,
      (eventType, filename: string | Buffer) => {
        if (eventType === 'change') {
          observer.next(new WatchChangeEvent(filename));
        } else if (eventType === 'rename') {
          observer.next(new WatchRenameEvent(filename));
        }
      },
    );

    // Register event listeners
    watcher.once('close', () => observer.complete());
    watcher.once('error', error => observer.error(new WatchError(path, error)));

    return () => {
      watcher.removeAllListeners();
      watcher.close();
    };
  });
}
