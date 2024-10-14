function clamp(num, min, max) {
  return Math.min(Math.max(num, min), max);
}

function bounceBack(value) {
  if (value <= 100) {
    return value;
  }

  return 100 - (value - 100);
}

function generateGraph(lightnessValue) {
  // return clamp(saturtionValue - (20 + saturtionValue / 5), 0, 60);
  return bounceBack(
    // Max value of either 98/95 or lightness value after inceasing is picked. Ex: primary is 89, after increasing by 15, it will be 104. But since 104 is greater, 104 will be picked.
    Math.max(
      lightnessValue + 5, // If primary color is extra light, then highlight should be inceased by 5. Otherwise, it will only incerease by 15.
      98 // If primary color is extra light, then highlight can go till 98. Otherwise, it can go till 95.
    )
  );
}

function init() {
  let values = "";
  for (let i = 0; i <= 100; i++) {
    values = values + `${generateGraph(i)}\n`;
  }
  console.log(values);
}

init();
