import { SQUARE_SIZE } from './global';

export const randomNum = (min, max) => {
  const minCeil = Math.ceil(min);
  const maxFloor = Math.floor(max);
  return Math.floor(Math.random() * (maxFloor - minCeil)) + minCeil;
};

export const squaresIntersect = (a, b) => {
  if (a < b) {
    return b < a + SQUARE_SIZE;
  } else {
    return a < b + SQUARE_SIZE;
  }
};

export const randomColor = () => {
  const hexDigits = "0123456789ABCDEF";

  let color = "#";
  for (let i = 0; i < 6; i ++) {
    color += hexDigits[Math.floor((Math.random() * 16))];
  }

  return color;
};

export const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
};
