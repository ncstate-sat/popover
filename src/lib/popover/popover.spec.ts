import { getInvalidPopoverError } from './popover.errors';

describe('sample', () => {

  it('should work', () => {
    expect(true).toBe(true);
  });

  it('should return an Error', () => {
    const result = getInvalidPopoverError();
    expect(result instanceof Error).toBeTruthy();
  })

});
