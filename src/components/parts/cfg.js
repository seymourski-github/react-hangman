
import { Circle, Line, Rect } from "react-konva";

const itemsList = {
  background: {
    config: { x: 5, y: 240, width: 280, height: 30, fill: 'green' },
    type: Rect
  },
  scaffold1:  {
    config: { x: 10, y: 10, width: 10, height: 230, fill: '#713a12' },
    type: Rect
  },
  scaffold2:  {
    config: { x: 10, y: 10, width: 140, height: 10, fill: '#713a12'  },
    type: Rect
  },
  scaffold3:  {
    config: { x: 10, y: 10, points:[5, 50, 40, 5], stroke: '#713a12', strokeWidth: 5  },
    type: Line,
  },
  noose: {
    config: { x: 50, y: 10, points:[80, 10, 80, 45], stroke: '#b0652e', strokeWidth: 5  },
    type: Line,
  },
  head: {
    config: { fill: '#fff', radius: 20, x: 130, y: 65, stroke: '#000', strokeWidth: 3  },
    type: Circle
  },
  body: {
    config: { x: 10, y: 10, points:[120, 75, 120, 140], stroke: '#000', strokeWidth: 3 },
    type: Line,
  },
  leftArm: {
    config: { x: 10, y: 10, points:[120, 80, 80, 100], stroke: '#000', strokeWidth: 3 },
    type: Line,
  },
  rightArm: {
    config: { x: 10, y: 10, points:[120, 80, 160, 100], stroke: '#000', strokeWidth: 3 },
    type: Line,
  },
  leftLeg: {
    config: { x: 10, y: 10, points:[120, 140, 100, 165], stroke: '#000', strokeWidth: 3 },
    type: Line,
  },
  rightLeg: {
    config: { x: 10, y: 10, points:[120, 140, 140, 165], stroke: '#000', strokeWidth: 3 },
    type: Line,
    text: '!!! Last guess !!!'
  },
};

export {
  itemsList
}
