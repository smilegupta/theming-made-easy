export function colorToRGB(color) {
  const d = document.documentElement;
  d.style.outlineColor = color;
  const computedColor = window.getComputedStyle(d).outlineColor;
  return computedColor.match(/[\.\d]+/g);
}

export function color2hsl(color) {
  const rgb = colorToRGB(color);
  if (!rgb) {
    return [];
  }
  return rgbTohsl(rgb.map(Number));
}

export function color2Hex(color) {
  const rgb = colorToRGB(color);
  if (!rgb) {
    return '';
  }
  const rgbArray = rgb.map(Number);
  return rgbToHex(rgbArray[0], rgbArray[1], rgbArray[2]);
}

export function hslToRgb([h, s, l]) {
  h /= 360;
  s /= 100;
  l /= 100;

  let r, g, b;

  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const hueTorgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;

    r = hueTorgb(p, q, h + 1 / 3);
    g = hueTorgb(p, q, h);
    b = hueTorgb(p, q, h - 1 / 3);
  }

  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

export function rgbTohsl(rgb) {
  let [r, g, b] = rgb;
  r /= 255;
  g /= 255;
  b /= 255;

  const vmax = Math.max(r, g, b);
  const vmin = Math.min(r, g, b);

  const l = (vmax + vmin) * 50;
  if (vmax === vmin) {
    return [0, 0, l]; // achromatic
  }

  const d = vmax - vmin;
  const s = 100 * (l > 50 ? d / (2 - vmax - vmin) : d / (vmax + vmin));
  let h;
  if (vmax === b) {
    h = (r - g) / d + 4;
  } else if (vmax === g) {
    h = (b - r) / d + 2;
  } else {
    h = (g - b) / d + (g < b ? 6 : 0);
  }
  h *= 60;

  return [Math.round(h), Math.round(s), Math.round(l)];
}

export const rgbToHex = (r, g, b) =>
  '#' +
  [r, g, b]
    .map((x) => {
      const hex = x.toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    })
    .join('');

const linearize = (val) => (val / 255.0) ** 2.4;

const clampLuminance = (luminance) => {
  const blkThrs = 0.022;
  const blkClmp = 1.414;

  if (luminance > blkThrs) {
    return luminance;
  }

  return Math.abs(blkThrs - luminance) ** blkClmp + luminance;
};

const getLuminance = ([red, green, blue]) => {
  const y =
    0.2126729 * linearize(red) +
    0.7151522 * linearize(green) +
    0.072175 * linearize(blue);
  return clampLuminance(y);
};

const getContrast = (background, foreground) => {
  const deltaYmin = 0.0005;
  const scale = 1.14;

  const backgroundLuminance = getLuminance(background);
  const foregroundLuminance = getLuminance(foreground);

  if (Math.abs(backgroundLuminance - foregroundLuminance) < deltaYmin) {
    return 0.0;
  }

  if (backgroundLuminance > foregroundLuminance) {
    return (backgroundLuminance ** 0.56 - foregroundLuminance ** 0.57) * scale;
  }

  if (backgroundLuminance < foregroundLuminance) {
    return (backgroundLuminance ** 0.65 - foregroundLuminance ** 0.62) * scale;
  }

  return 0.0;
};

const scaleContrast = (contrast) => {
  const loClip = 0.001;
  const loConThresh = 0.035991;
  const loConFactor = 27.7847239587675;
  const loConOffset = 0.027;

  const absContrast = Math.abs(contrast);

  if (absContrast < loClip) {
    return 0.0;
  }

  if (absContrast <= loConThresh) {
    return contrast - contrast * loConFactor * loConOffset;
  }

  if (contrast > loConThresh) {
    return contrast - loConOffset;
  }

  if (contrast < -loConThresh) {
    return contrast + loConOffset;
  }

  return 0.0;
};

export const getAPCAContrast = (background, foreground) => {
  const contrast = getContrast(background, foreground);
  const scaledContrast = scaleContrast(contrast);
  return scaledContrast * 100;
};

export function isValidHexColorCode(color) {
  return /^#(?:[0-9a-f]{3}){1,2}$/i.test(color);
}

export function lightenTo(hsl, to) {
  return [hsl[0], hsl[1], to];
}

export function rgbToString(rgb) {
  return `rgb(${rgb.join(', ')})`;
}

export function hslString(hsl) {
  return `${hsl[0].toFixed()}deg ${hsl[1].toFixed()}% ${hsl[2].toFixed()}%`;
}
