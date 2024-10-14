import {
  getAPCAContrast,
  hslToRgb,
  color2hsl,
  lightenTo,
  hslString,
} from "./colors";
import { inRange, clamp } from "./numbers";
import flatMap from "./flatMap";

// =============================
// Tint & Shade Generation Helpers
// =============================

// Converts tints and shades to HSL strings.
function stringifyTintAndShades(colors) {
  return Object.keys(colors).reduce((acc, key) => {
    const color = colors[key];
    return {
      ...acc,
      [key]: hslString(color),
    };
  }, {});
}

// Converts tints and shades to HSL strings.
function generateTintAndShades(color, flip = false) {
  let lightValues = [100, 98, 96, 95, 90, 80, 70, 60, 50, 40, 30, 20, 10, 5, 0];
  if (flip) {
    lightValues = lightValues.reverse();
  }

  return {
    _: color,
    0: lightenTo(color, lightValues[0]),
    10: lightenTo(color, lightValues[1]),
    25: lightenTo(color, lightValues[2]),
    50: lightenTo(color, lightValues[3]),
    100: lightenTo(color, lightValues[4]),
    200: lightenTo(color, lightValues[5]),
    300: lightenTo(color, lightValues[6]),
    400: lightenTo(color, lightValues[7]),
    500: lightenTo(color, lightValues[8]),
    600: lightenTo(color, lightValues[9]),
    700: lightenTo(color, lightValues[10]),
    800: lightenTo(color, lightValues[11]),
    900: lightenTo(color, lightValues[12]),
    950: lightenTo(color, lightValues[13]),
    1000: lightenTo(color, lightValues[14]),
  };
}

// Generates the best contrasting tints and shades.
function generateOnTintAndShades(colors) {
  return {
    _: getBestContrastTintOrShade(colors._, colors[0], colors[950]),
    0: getBestContrastTintOrShade(colors[0], colors[0], colors[950]),
    10: getBestContrastTintOrShade(colors[10], colors[0], colors[950]),
    25: getBestContrastTintOrShade(colors[25], colors[0], colors[950]),
    50: getBestContrastTintOrShade(colors[50], colors[0], colors[950]),
    100: getBestContrastTintOrShade(colors[100], colors[0], colors[950]),
    200: getBestContrastTintOrShade(colors[200], colors[0], colors[950]),
    300: getBestContrastTintOrShade(colors[300], colors[0], colors[950]),
    400: getBestContrastTintOrShade(colors[400], colors[0], colors[950]),
    500: getBestContrastTintOrShade(colors[500], colors[0], colors[950]),
    600: getBestContrastTintOrShade(colors[600], colors[0], colors[950]),
    700: getBestContrastTintOrShade(colors[700], colors[0], colors[950]),
    800: getBestContrastTintOrShade(colors[800], colors[0], colors[950]),
    900: getBestContrastTintOrShade(colors[900], colors[0], colors[950]),
    950: getBestContrastTintOrShade(colors[950], colors[0], colors[950]),
    1000: getBestContrastTintOrShade(colors[1000], colors[0], colors[950]),
  };
}

// Selects the tint or shade with the best contrast.
function getBestContrastTintOrShade(color, lightest, darkest) {
  const lightContrast = Math.abs(
    getAPCAContrast(hslToRgb(color), hslToRgb(lightest))
  );
  const darkContrast = Math.abs(
    getAPCAContrast(hslToRgb(color), hslToRgb(darkest))
  );

  return lightContrast > darkContrast ? lightest : darkest;
}

// =============================
// Color Lightness/Darkness Checks
// =============================

function isColorExtraLight(color) {
  try {
    const themeHsl = color2hsl(color);
    return themeHsl[2] >= 90;
  } catch (e) {
    console.error(e);
  }

  return false;
}

function isColorExtraDark(color) {
  try {
    const themeHsl = color2hsl(color);
    return themeHsl[2] <= 10;
  } catch (e) {
    console.error(e);
  }

  return false;
}

// =============================
// Helpers for illustrations theming
// =============================

function bounceBack(value) {
  if (value <= 100) {
    return value;
  }

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

  const colorMatched = PRIMARY_COLORS_FOR_ACCENT.some((color) => {
    return (
      color[0] === Math.round(primaryColor[0]) &&
      color[1] === Math.round(primaryColor[1]) &&
      color[2] === Math.round(primaryColor[2])
    );
  });

  const darkColors =
    inRange(primaryColor[1], 0, 30) && inRange(primaryColor[2], 0, 20);

  const darkBlueColor =
    inRange(primaryColor[0], 190, 240) &&
    inRange(primaryColor[1], 0, 20) &&
    inRange(primaryColor[2], 10, 70);

  return darkBlueColor || darkColors || colorMatched;
}

// =============================
// Miscellaneous Helpers
// =============================

function sanitizeColor(color) {
  return color.replace(/[^\w\.#(),% ]/g, "");
}

function flatTheme(value, key = "") {
  return flatMap(Object.keys(value), (key2) => {
    const combinedKey = key2 === "_" ? key : key ? `${key}-${key2}` : key2;
    const value2 = value[key2];
    if (typeof value2 === "string") {
      return [
        {
          name: combinedKey,
          value: value2,
        },
      ];
    }
    return flatTheme(value2, combinedKey);
  });
}

function buildTheme({ primaryColor, merchantSurfaceColor }) {
  const primaryHsl = color2hsl(primaryColor);
  const surfaceColor =
    merchantSurfaceColor || `hsl(${hslString(lightenTo(primaryHsl, 99))})`;

  const successColor = "#009E5C";
  const dangerColor = "#ef4444";
  const warningColor = "#eab308";

  const surfaceHsl = color2hsl(surfaceColor);
  const isSurfaceColorDark = surfaceHsl[2] < 50;
  const surfaceTintAndShades = generateTintAndShades(
    surfaceHsl,
    isSurfaceColorDark
  );

  // if too close to white, then make the surface color white
  if (surfaceHsl[2] >= 98) {
    surfaceTintAndShades._ = lightenTo(surfaceHsl, 100);
  }

  const primaryTintAndShades = generateTintAndShades(primaryHsl);
  const successTintAndShades = generateTintAndShades(color2hsl(successColor));
  const dangerTintAndShades = generateTintAndShades(color2hsl(dangerColor));
  const warningTintAndShades = generateTintAndShades(color2hsl(warningColor));

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
    },
    surface: stringifyTintAndShades(surfaceTintAndShades),
    primary: stringifyTintAndShades(primaryTintAndShades),
    success: stringifyTintAndShades(successTintAndShades),
    danger: stringifyTintAndShades(dangerTintAndShades),
    warning: stringifyTintAndShades(warningTintAndShades),

    illustration: {
      // SHADOWS:
      // FOR EXTRA LIGHT COLORS:
      // - keep hue same as primary
      // - saturation should always be between 0 to 60 because we don't want high saturated shadows for high saturated primary colors
      // - saturation should keep decreasing as saturation of primary color decreases. So we have generated a formula to reduce saturation by (20 + primarySaturation / 5).
      //   when primary color saturation is high, we want to reduce it more and when it is low, we want to reduce it less.
      // - lightness should be reduced by 15 always
      shadow: isColorExtraLight(primaryColor)
        ? hslString([
            primaryHsl[0],
            clamp(primaryHsl[1] - (20 + primaryHsl[1] / 5), 0, 60),
            clamp(primaryHsl[2] - 15, 0, 100),
          ])
        : // FOR NON-EXTRA LIGHT COLORS:
          // - keep hue same as primary
          // - saturation should always be between 0 to 90.the formula to reduce saturation is (1 + primarySaturation / 10).
          //   As saturation of primary color increases, we want to reduce it more. And as saturation of primary color decreases, we want to reduce it less.
          hslString([
            primaryHsl[0],
            clamp(primaryHsl[1] - (1 + primaryHsl[1] / 10), 0, 90),
            clamp(primaryHsl[2] - (15 + primaryHsl[2] / 10), 0, 90),
          ]),

      // MIDTONE:
      // FOR EXTRA DARK COLORS:
      // - incease the lightness by 20 * (1 - primaryHsl[2] / 100). This will make sure that the midtone is not too dark for extra dark colors.
      // For non extra dark colors, keep the lightness same as primary
      midtone: isColorExtraDark(primaryColor)
        ? hslString([
            primaryHsl[0],
            primaryHsl[1],
            primaryHsl[2] + 20 * (1 - primaryHsl[2] / 100),
          ])
        : hslString(primaryHsl),

      // HIGHLIGHT:
      highlight: hslString([
        primaryHsl[0],
        primaryHsl[1],

        // Whatever max value is picked, we need to bounce back from 100. Meaning, if the value is 104, then we do 104-100 = 96. So, 96 will be picked.
        // Imagine the value going towards 100 wall and then bouncing back from 100 wall. So, 105 becomes 95, 106 becomes 94 and so on.
        // This ensures that the highlight value is a bit darker for extremely light colors. and light for other colors. So that the highlight is visible and doesn't mix with primary and midtone colors.
        bounceBack(
          // Max value of either 98/95 or lightness value after inceasing is picked. Ex: primary is 89, after increasing by 15, it will be 104. But since 104 is greater, 104 will be picked.
          Math.max(
            primaryHsl[2] + (isColorExtraLight(primaryColor) ? 5 : 15), // If primary color is extra light, then highlight should be inceased by 5. Otherwise, it will only incerease by 15.
            isColorExtraLight(primaryColor) ? 98 : 95 // If primary color is extra light, then highlight can go till 98. Otherwise, it can go till 95.
          )
        ),
      ]),

      // ACCENT:
      // For extra light colors:
      // - keep hue same as primary
      // - saturation should always be between 0 to 60 because we don't want high saturated shadows for high saturated primary colors
      // - saturation should keep decreasing as saturation of primary color decreases. So we have generated a formula to reduce saturation by (10 + primarySaturation / 5).
      //   when primary color saturation is high, we want to reduce it more and when it is low, we want to reduce it less.
      // - lightness should be reduced by 20 always
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
        : // For non-extra light colors:
          // - keep hue same as primary
          // - keep saturation same as primary
          // - lightness should increase by formula ((primaryHsl[2] < 10 ? 15 : 10) + (100 - primaryHsl[2]) / 10). This will ensure that the accent color is always a bit lighter than primary color.
          hslString([
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

export function createTheme({ primaryColor, surfaceColor }) {
  const colorThemeVars = buildTheme({
    primaryColor,
    merchantSurfaceColor: surfaceColor,
  });
  return `:root{${flatTheme(colorThemeVars)
    .map((t) => `--${t.name}: ${sanitizeColor(t.value)};`)
    .join("\n")}}`;
}
