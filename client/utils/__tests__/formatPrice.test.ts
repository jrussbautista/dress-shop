import formatPrice from '../formatPrice';

test('correctly format price without comma', () => {
  expect(formatPrice(500)).toBe('P500');
  expect(formatPrice(400)).toBe('P400');
});

test('correctly format price with comma', () => {
  expect(formatPrice(1000)).toBe('P1,000');
  expect(formatPrice(4000)).toBe('P4,000');
});
