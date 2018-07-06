import { ShapeBase } from './shapeBase';
import { Point } from '../type/point';

export class ShapeSquare extends ShapeBase {

    constructor() {
        super();
        this.drawShape();
    }

    drawShape() {
        const x = this.position.x;
        const y = this.position.y;
        this.allShapes = [[new Point(x, y - 1), new Point(x + 1, y - 1), new Point(x, y), new Point(x + 1, y)]];
        this.index = 0;
        this.blocks = this.allShapes[0];
    }

}
