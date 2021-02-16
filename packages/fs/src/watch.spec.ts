import { WatchChangeEvent, WatchError, WatchRenameEvent } from './watch';

describe('watch', () => {
  describe('errors', () => {
    it('should create error', () => {
      const path = 'test';
      const innerError = new Error('inner error');
      const error = new WatchError(path, innerError);

      expect(error).toBeDefined();
      expect(error.error).toBe(innerError);
      expect(error.path).toBe(path);
    });
  });

  describe('events', () => {
    const filename = 'test';

    it('should create rename event', () => {
      const e = new WatchRenameEvent(filename);
      expect(e).toBeDefined();
      expect(e.event).toBe('rename');
      expect(e.filename).toBe(filename);
    });

    it('should create change event', () => {
      const e = new WatchChangeEvent(filename);
      expect(e).toBeDefined();
      expect(e.event).toBe('change');
      expect(e.filename).toBe(filename);
    });
  });
});
