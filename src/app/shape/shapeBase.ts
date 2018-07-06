import { Point } from '../type/point';

export abstract class ShapeBase {

    position: Point;
    blocks: Point[];

    allShapes: any[];
    index: number;

    constructor() {
        this.position = new Point(4, 1);
    }

    rotate() {
        console.log('旋转');
        this.index = (this.index + 1) % this.allShapes.length;
        this.drawShape();
    }

    left() {
        console.log('向左');
        this.position.x--;
        this.drawShape();
    }

    right() {
        console.log('向右');
        this.position.x++;
        this.drawShape();
    }

    down() {
        console.log('向下');
        this.position.y++;
        this.drawShape();
    }

    abstract drawShape();
}
