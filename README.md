# Building Scalable Themes with Color

This project demonstrates how to create scalable themes that can adapt seamlessly to any color palette, allowing for customizable and dynamic user experiences.

#### [Video](https://www.youtube.com/watch?v=eRMmvXcCLwU) 
#### [Playable Demo](theming-made-easy.vercel.app)

## 📚 Pre-Reads

Before diving into this project, it's helpful to understand some key concepts:

### What is HSL?

HSL stands for **Hue, Saturation, and Lightness**. Imagine you have a color wheel (like the ones you see in art class). The **Hue** is the name of the color, like red, blue, or green, and it’s measured in degrees on the wheel (0° for red, 120° for green, 240° for blue, and so on).

**Saturation** is how intense or pure the color is. A fully saturated color is bold and vivid, while a low saturation makes the color look more gray.

**Lightness** controls how light or dark the color is. A lightness of 100% is white, and 0% is black, with all the hues in between.

Think of it like playing with paint: 
- Hue is choosing the color.
- Saturation is how much of that color you want to use.
- Lightness is mixing it with white or black to get different shades.

### What is APCA?

**APCA** stands for **Advanced Perceptual Contrast Algorithm**. It helps us figure out if two colors contrast well enough for people to see clearly, especially those with vision difficulties.

Imagine you’re drawing with chalk on a blackboard. If you use yellow chalk, it's easy to see. But if you use dark green chalk, it might be hard to read from the back of the room. APCA helps us pick colors like the yellow chalk that stand out well and are easy to read, even for people with vision impairments.

## 🎨 Basic Colors

In this project, we work with three primary types of colors:

1. **Primary Color** – The main color of your theme (like #058cff).
2. **Surface Color** – The color used for backgrounds or surfaces (like light grays or whites).
3. **CTA (Call-To-Action) Color** – A color used to draw attention to important buttons or actions (like a vibrant green or red).

## Create basic colors with any solid color and basic setup and useage

<img width="744" alt="image" src="https://github.com/user-attachments/assets/0de12dd8-1e99-460a-94aa-ae2034e7ecd4">

```js
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
```

## Creating surface colors
<img width="779" alt="image" src="https://github.com/user-attachments/assets/a0938dce-eb80-4216-8076-28b6d1a0b20d">

## Creating on colors
<img width="641" alt="image" src="https://github.com/user-attachments/assets/40cf8d4b-935e-4c45-a722-a9e1e042d7ca">

## Generated color palette
<img width="1440" alt="image" src="https://github.com/user-attachments/assets/aecebbbc-3873-4b77-b9a6-10ddee1b9a4c">

### Do's and Don'ts

#### ✅ Do's
- **Use contrasting colors**: Ensure that your text stands out from your background by using the APCA method.
- **Test accessibility**: Always check that your color combinations are accessible to users with vision impairments.
- **Stay consistent**: Use a fixed palette of colors for your UI elements to maintain design consistency.

#### ❌ Don'ts
- **Avoid overly vibrant backgrounds**: Highly saturated or bright background colors can be overwhelming and make text hard to read.
- **Don't rely solely on color**: Use text or icons in addition to color to indicate important elements (like errors or success messages).


# Other Good Reads and Resouces
- [Color Formulas for calulating contrast](https://gist.github.com/hail2u/a1fb620d4826c5b476180ee6285618a5?permalink_comment_id=4022454#gistcomment-4022454)


