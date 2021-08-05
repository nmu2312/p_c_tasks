export const add = (...nums) => {
  if (nums.length > 30) {
    throw new Error();
  }
  nums.forEach((num) => {
    if (typeof num !== 'number') {
      throw new Error();
    }
  });
  const result = nums.reduce((a, b) => a + b);
  return result > 1000 ? 'too big' : result;
};

export const substract = (...nums) => {
  if (nums.length > 30) {
    throw new Error();
  }
  nums.forEach((num) => {
    if (typeof num !== 'number') {
      throw new Error();
    }
  });
  const result = nums.reduce((a, b) => a - b);
  return result < 0 ? 'negative number' : result;
};

export const multiply = (...nums) => {
  if (nums.length > 30) {
    throw new Error();
  }
  nums.forEach((num) => {
    if (typeof num !== 'number') {
      throw new Error();
    }
  });
  const result = nums.reduce((a, b) => a * b);
  return result > 1000 ? 'big big number' : result;
};

export const devide = (...nums) => {
  if (nums.length > 30) {
    throw new Error();
  }
  nums.forEach((num) => {
    if (typeof num !== 'number') {
      throw new Error();
    }
  });
  const result = nums.reduce((a, b) => a / b);
  return Math.round(result * Math.pow(10, 4)) / Math.pow(10, 4);
};
