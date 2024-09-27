import {
  getAPCAContrast,
  hslToRgb,
  color2hsl,
  lightenTo,
  hslString,
} from "./colors";
import { inRange, clamp } from "./numbers";
import flatMap from "./flatMap";

const BORDER_RADIUS_STYLE = {
  ROUNDED: "rounded",
  SHARP: "sharp",
};

const BORDER_RADIUS_CSS_PROPERTY_NAME = "border-radius";

export const BORDER_RADIUS_CSS_SELECTOR = "[class*=rounded]:not(.rounded-full)";

export function createTheme(primaryColor, surfaceColor, styleConfig) {
  const colorThemeVars = buildTheme(primaryColor, surfaceColor);
  return `
  <style>
    :root{--primary: 'red'}
  </style>`;
}

function buildThemePropertyCSS(propertyName, selector, value) {
  const cssRule = getThemeCSSRule(propertyName, value);
  if (cssRule) {
    const { cssPropertyName, cssPropertyValue } = cssRule;
    return `[data-${cssPropertyName}=${value}] ${selector} {
      ${cssPropertyName}: ${cssPropertyValue};
    }`;
  }
  return null;
}

function getThemeCSSRule(propertyName, value) {
  if (propertyName === "border_radius" && value === BORDER_RADIUS_STYLE.SHARP) {
    return {
      cssPropertyName: BORDER_RADIUS_CSS_PROPERTY_NAME,
      cssPropertyValue: "0px !important",
    };
  }
  return null;
}

function buildTheme(primaryColor, merchantSurfaceColor) {
  const primaryHsl = color2hsl(primaryColor);
  const surfaceColor =
    merchantSurfaceColor || `hsl(${hslString(lightenTo(primaryHsl, 99))})`;

  const successColor = "#009E5C";
  const dangerColor = "#ef4444";
  const warningColor = "#eab308";
  const infoColor = "#0ea5e9";

  const surfaceHsl = color2hsl(surfaceColor);
  const isSurfaceColorDark = surfaceHsl[2] < 50;
  const surfaceTintAndShades = generateTintAndShades(
    surfaceHsl,
    isSurfaceColorDark
  );

  if (surfaceHsl[2] >= 98) {
    surfaceTintAndShades._ = lightenTo(surfaceHsl, 100);
  }

  const primaryTintAndShades = generateTintAndShades(primaryHsl);
  const successTintAndShades = generateTintAndShades(color2hsl(successColor));
  const dangerTintAndShades = generateTintAndShades(color2hsl(dangerColor));
  const warningTintAndShades = generateTintAndShades(color2hsl(warningColor));
  const infoTintAndShades = generateTintAndShades(color2hsl(infoColor));

  return {
    on: {
      surface: stringifyTintAndShades(
        generateOnTintAndShades(surfaceTintAndShades)
      ),
      primary: stringifyTintAndShades(
        generateOnTintAndShades(primaryTintAndShades)
      ),
      success: stringifyTintAndShades(
        generateOnTintAndShades(successTintAndShades)
      ),
      danger: stringifyTintAndShades(
        generateOnTintAndShades(dangerTintAndShades)
      ),
      warning: stringifyTintAndShades(
        generateOnTintAndShades(warningTintAndShades)
      ),
      info: stringifyTintAndShades(generateOnTintAndShades(infoTintAndShades)),
    },
    outline: {
      surface: { _: color2hsl("#D9D9D9") },
    },
    surface: stringifyTintAndShades(surfaceTintAndShades),
    primary: stringifyTintAndShades(primaryTintAndShades),
    success: stringifyTintAndShades(successTintAndShades),
    danger: stringifyTintAndShades(dangerTintAndShades),
    warning: stringifyTintAndShades(warningTintAndShades),
    info: stringifyTintAndShades(infoTintAndShades),
    i: {
      shadow: hslString([primaryHsl[0], Math.min(primaryHsl[1], 60), 25]),
      midtone: hslString([primaryHsl[0], Math.min(primaryHsl[1], 60), 50]),
      highlight: hslString(color2hsl("#fff9e8")),
    },
    illustration: {
      shadow: isColorExtraLight(primaryColor)
        ? hslString([
            primaryHsl[0],
            clamp(primaryHsl[1] - (20 + primaryHsl[1] / 5), 0, 60),
            clamp(primaryHsl[2] - 15, 0, 100),
          ])
        : hslString([
            primaryHsl[0],
            clamp(primaryHsl[1] - (1 + primaryHsl[1] / 10), 0, 90),
            clamp(primaryHsl[2] - (15 + primaryHsl[2] / 10), 0, 90),
          ]),
      midtone: isColorExtraDark(primaryColor)
        ? hslString([
            primaryHsl[0],
            primaryHsl[1],
            primaryHsl[2] + 20 * (1 - primaryHsl[2] / 100),
          ])
        : hslString(primaryHsl),
      highlight: hslString([
        primaryHsl[0],
        primaryHsl[1],
        bounceBack(
          Math.max(
            primaryHsl[2] + (isColorExtraLight(primaryColor) ? 5 : 15),
            isColorExtraLight(primaryColor) ? 98 : 95
          )
        ),
      ]),
      accent: isColorExtraLight(primaryColor)
        ? shouldShowAccentColor(primaryHsl)
          ? hslString(color2hsl("#E16E50"))
          : hslString([
              primaryHsl[0],
              clamp(primaryHsl[1] - (10 + primaryHsl[1] / 5), 0, 60),
              primaryHsl[2] - 20,
            ])
        : shouldShowAccentColor(primaryHsl)
        ? hslString(color2hsl("#29CC7A"))
        : hslString([
            primaryHsl[0],
            primaryHsl[1],
            Math.min(
              Math.abs(
                primaryHsl[2] +
                  ((primaryHsl[2] < 10 ? 15 : 10) + (100 - primaryHsl[2]) / 10)
              ),
              90
            ),
          ]),
    },
  };
}

function bounceBack(value) {
  if (value <= 100) return value;
  return 100 - (value - 100);
}

function shouldShowAccentColor(primaryColor) {
  const PRIMARY_COLORS_FOR_ACCENT = [
    [217, 84, 63],
    [210, 100, 35],
    [210, 100, 50],
    [210, 100, 25],
    [217, 100, 47],
    [0, 0, 7],
    [0, 0, 92],
  ];

  const colorMatched = PRIMARY_COLORS_FOR_ACCENT.some(
    (color) =>
      color[0] === Math.round(primaryColor[0]) &&
      color[1] === Math.round(primaryColor[1]) &&
      color[2] === Math.round(primaryColor[2])
  );

  const darkColors =
    inRange(primaryColor[1], 0, 30) && inRange(primaryColor[2], 0, 20);
  const darkBlueColor =
    inRange(primaryColor[0], 190, 240) &&
    inRange(primaryColor[1], 0, 20) &&
    inRange(primaryColor[2], 10, 70);

  return darkBlueColor || darkColors || colorMatched;
}

function generateTintAndShades(color, flip = false) {
  let lightValues = [100, 98, 96, 95, 90, 80, 70, 60, 50, 40, 30, 20, 10, 5, 0];
  if (flip) lightValues = lightValues.reverse();

  return lightValues.reduce(
    (acc, value, idx) => {
      acc[idx * 100] = lightenTo(color, value);
      return acc;
    },
    { _: color }
  );
}

function generateOnTintAndShades(colors) {
  return Object.keys(colors).reduce((acc, key) => {
    acc[key] = getBestContrastTintOrShade(colors[key], colors[0], colors[950]);
    return acc;
  }, {});
}

function stringifyTintAndShades(colors) {
  return Object.keys(colors).reduce((acc, key) => {
    acc[key] = hslString(colors[key]);
    return acc;
  }, {});
}

function getBestContrastTintOrShade(color, lightest, darkest) {
  const lightContrast = Math.abs(
    getAPCAContrast(hslToRgb(color), hslToRgb(lightest))
  );
  const darkContrast = Math.abs(
    getAPCAContrast(hslToRgb(color), hslToRgb(darkest))
  );

  return lightContrast > darkContrast ? lightest : darkest;
}

function flatTheme(value, key = "") {
  return flatMap(Object.keys(value), (key2) => {
    const combinedKey = key2 === "_" ? key : key ? `${key}-${key2}` : key2;
    const value2 = value[key2];
    if (typeof value2 === "string") {
      return [{ name: combinedKey, value: value2 }];
    }
    return flatTheme(value2, combinedKey);
  });
}

function sanitizeColor(color) {
  return color.replace(/[^\w\.#(),% ]/g, "");
}

export function isColorExtraLight(color) {
  try {
    const themeHsl = color2hsl(color);
    return themeHsl[2] >= 90;
  } catch (error) {}
  return false;
}

export function isColorExtraDark(color) {
  try {
    const themeHsl = color2hsl(color);
    return themeHsl[2] <= 10;
  } catch (error) {}
  return false;
}

export function getColorLightness(color) {
  try {
    const themeHsl = color2hsl(color);
    return themeHsl[2];
  } catch (error) {}
  return null;
}
