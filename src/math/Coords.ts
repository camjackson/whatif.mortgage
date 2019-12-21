export type Coords = {
  x: number;
  y: number;
};

const constrainNumber = (x: number, min: number, max: number) =>
  Math.max(Math.min(x, max), min);

export const constrainCoords = (value: Coords, min: Coords, max: Coords) => ({
  x: constrainNumber(value.x, min.x, max.x),
  y: constrainNumber(value.y, min.y, max.y),
});
