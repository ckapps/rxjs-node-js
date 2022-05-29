import { rename as _rename } from 'fs';
import { bindNodeCallback } from 'rxjs';

/**
 * Asynchronously rename file at `oldPath` to the pathname provided as `newPath`.
 * In the case that `newPath` already exists, it will be overwritten.
 * If there is a directory at `newPath`, an error will be raised instead.
 *
 * @param oldPath Old path that should be renamed
 * @param newPath Name of the path to rename `oldPath` to
 *
 * @returns
 * An observable that emits when the path was renamed, then completes.
 */
export const rename = bindNodeCallback(_rename);
