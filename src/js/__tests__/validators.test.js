import { isValidCardNumber } from '../validators';

test('validate false card number', () => {
  const result = isValidCardNumber('1234567890');
  expect(result).toBe(false);
});

test('validate true card number', () => {
  const result = isValidCardNumber('371449635398431');
  expect(result).toBe(true);
});

test('validate empty card number', () => {
  const result = isValidCardNumber('');
  expect(result).toBe(false);
});
