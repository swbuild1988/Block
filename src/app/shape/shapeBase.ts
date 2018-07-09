import { Point } from '../type/point';
import { Log } from '../../log';
import * as myGlobals from '../../globals';

export abstract class ShapeBase {

    position: Point;
    blocks: Point[];
    color: string;

    allShapes: any[];
    index: number;

    constructor() {
        this.position = new Point(4, 1);

        // 随机颜色
        const len = myGlobals.shape_colors.length;
        const index = Math.floor(Math.random() * len);
        this.color = myGlobals.shape_colors[index];
    }

    rotate() {
        Log.info('旋转');
        this.index = (this.index + 1) % this.allShapes.length;
        this.drawShape();
    }

    left() {
        Log.info('向左');
        this.position.x--;
        this.drawShape();
    }

    right() {
        Log.info('向右');
        this.position.x++;
        this.drawShape();
    }

    down() {
        Log.info('向下');
        this.position.y++;
        this.drawShape();
    }

    getNextShape(): any {
        const tmpIndex = (this.index + 1) % this.allShapes.length;
        return this.allShapes[tmpIndex];
    }

    abstract drawShape();
}
