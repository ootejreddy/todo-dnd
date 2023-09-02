const colors = ["red", "orange", "blue", "green", "yellow", "purple", "pink"];

export function pickRandomColor() {
  const color = colors[Math.floor(Math.random() * colors.length)];
  return color;
}
