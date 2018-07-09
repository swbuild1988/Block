import { ShapeBase } from './shapeBase';
import { Point } from '../type/point';

export class ShapeT extends ShapeBase {
  constructor() {
    super();
    // 随机生成决定出现啥形状
    this.index = Math.floor(Math.random() * 4);
    this.drawShape();
  }

  drawShape() {
    const x = this.position.x;
    const y = this.position.y;
    this.allShapes = [
      [
        new Point(x - 1, y),
        new Point(x, y),
        new Point(x + 1, y),
        new Point(x, y - 1)
      ],
      [
        new Point(x, y - 1),
        new Point(x, y),
        new Point(x, y + 1),
        new Point(x + 1, y)
      ],
      [
        new Point(x - 1, y),
        new Point(x, y),
        new Point(x + 1, y),
        new Point(x, y + 1)
      ],
      [
        new Point(x, y - 1),
        new Point(x, y),
        new Point(x, y + 1),
        new Point(x - 1, y)
      ]
    ];
    for (const shapes of this.allShapes) {
      for (const block of shapes) {
        block.color = this.color;
      }
    }
    this.blocks = this.allShapes[this.index];
  }
}
