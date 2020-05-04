import { validateDataURL } from '../src/dataUrlFunctions';

describe('data url functions', () => {
  it('validates data urls', async () => {
    expect(validateDataURL('obviously invalid url')).toBe(false);
    expect(validateDataURL('data,still invalid')).toBe(false);
    expect(validateDataURL('data:text/plain,this one is fine')).toBe(true);
    expect(validateDataURL('data:image/png;base64,thatsok')).toBe(true);
  });
});
