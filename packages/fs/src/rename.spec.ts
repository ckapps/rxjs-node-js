import { rename as _rename } from 'fs';
import { bindNodeCallback } from 'rxjs';
import { rename } from './rename';

jest.mock('rxjs', () => {
  return { bindNodeCallback: jest.fn(v => v) };
});

describe('rename', () => {
  it('should be defined', () => {
    expect(rename).toBeDefined();
  });

  it('should bind node callback', () => {
    expect(bindNodeCallback).toBeCalledWith(_rename);
  });
});
