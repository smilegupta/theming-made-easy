export function inRange(num, min, max) {
  return num >= min && num <= max;
}

export function isNumber(value) {
  return typeof value === 'number' && !isNaN(value);
}

export function isFloatingPointNumber(val) {
  if (typeof val !== 'number' || isNaN(val)) {
    return false;
  }
  return val % 1 !== 0;
}

export function clamp(num, min, max) {
  return Math.min(Math.max(num, min), max);
}
