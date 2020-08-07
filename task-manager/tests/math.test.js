const {calculateTip} = require('../src/math');

test('Should calculate total with tip', () => {
  const total = calculateTip(10, 0.3);
  expect(total).toBe(13)

  // if (total !== 13) {
  //   throw new Error('total should be 13, got ' + total)
  // }
})
