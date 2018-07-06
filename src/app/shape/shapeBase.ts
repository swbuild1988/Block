import { Point } from '../type/point';

export abstract class ShapeBase {

    position: Point;
    blocks: Point[];

    allShapes: any[];
    index: number;

    constructor() {
        this.position = new Point(5, 1);
    }

    rotate() {
        this.index = (this.index + 1) % this.allShapes.length;
        this.blocks = this.allShapes[this.index];
    }

    left() {
        this.position.x--;
    }

    right() {
        this.position.x++;
    }

    down() {
        this.position.y++;
    }
}