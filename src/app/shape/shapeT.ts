import { ShapeBase } from './shapeBase'
import { Point } from '../type/point';

export class ShapeT extends ShapeBase {

    constructor() {
        super();

        let x = this.position.x;
        let y = this.position.y;
        this.allShapes = [
            [new Point(x - 1, y), new Point(x, y), new Point(x + 1, y), new Point(x, y - 1)],
            [new Point(x, y - 1), new Point(x, y), new Point(x, y + 1), new Point(x + 1, y)],
            [new Point(x - 1, y), new Point(x, y), new Point(x + 1, y), new Point(x, y + 1)],
            [new Point(x, y - 1), new Point(x, y), new Point(x, y + 1), new Point(x - 1, y)]
        ];

        this.index = Math.floor(Math.random() * 4);
        this.blocks = this.allShapes[this.index];
    }

}