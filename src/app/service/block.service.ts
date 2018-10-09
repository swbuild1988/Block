import { Injectable } from '@angular/core';
import { ShapeBase } from '../class/shape/shapeBase';
import { ShapeT } from '../class/shape/shapeT';
import { ShapeSquare } from '../class/shape/shapeSquare';
import * as myGlobals from '../../globals';
import { Log } from '../tool/log';
import { Point } from '../class/type/point';
import { ShapeL } from '../class/shape/shapeL';
import { ShapeL2 } from '../class/shape/shapeL2';
import { ShapeZ } from '../class/shape/shapeZ';
import { ShapeZ2 } from '../class/shape/shapeZ2';
import { ShapeI } from '../class/shape/shapeI';

@Injectable({
    providedIn: 'root'
})
export class BlockService {

    // 当前活动的形状
    currentShape: ShapeBase;
    // 下一个形状
    nextShape: ShapeBase;
    // 分数
    score = 0;

    constructor() {
        this.currentShape = this.getNewShape();
        this.nextShape = this.getNewShape();
    }

    // 获取新的形状
    getNewShape(): ShapeBase {
        const shapeIndex = Math.floor(Math.random() * myGlobals.shape_num);
        switch (shapeIndex) {
            case 0:
                return new ShapeSquare();

            case 1:
                return new ShapeT();

            case 2:
                return new ShapeL();

            case 3:
                return new ShapeL2();

            case 4:
                return new ShapeZ();

            case 5:
                return new ShapeZ2();

            case 6:
                return new ShapeI();

            default:
                return new ShapeT();
        }
    }

    // 一回合结束，下一回合
    next(): void {
        // 当前方块变成新的
        this.currentShape = this.nextShape;
        this.nextShape = this.getNewShape();
    }

    // 能否旋转
    canRotate(width: number, height: number, stock: Array<Array<number>>): boolean {
        const nextBlocks = this.currentShape.getNextShape();
        for (const block of nextBlocks) {
            if (block.y === height - 1) {
                return false;
            }
            if (block.x === width - 1) {
                return false;
            }
            if (block.x === 0) {
                return false;
            }
            if (stock[block.x - 1][block.y] > 0) {
                return false;
            }
        }

        return true;
    }

    // 能否左移
    canLeft(stock: Array<Array<number>>): boolean {
        for (const block of this.currentShape.blocks) {
            if (block.x === 0) {
                return false;
            }
            if (stock[block.x - 1][block.y] > 0) {
                return false;
            }
        }

        return true;
    }

    // 能否右移
    canRight(width: number, stock: Array<Array<number>>): boolean {
        for (const block of this.currentShape.blocks) {
            if (block.x === width - 1) {
                return false;
            }
            if (stock[block.x + 1][block.y] > 0) {
                return false;
            }
        }
        return true;
    }

    // 能否下移
    canDown(height: number, stock: Array<Array<number>>): boolean {
        for (const block of this.currentShape.blocks) {
            if (block.y === height - 1) {
                return false;
            }
            if (stock[block.x][block.y + 1] > 0) {
                return false;
            }
        }
        return true;
    }

    // 加分
    addScore(clearNum: number): void {
        this.score += (clearNum * (clearNum + 1)) / 2;
    }

    // 清分
    clearScore(): void {
        this.score = 0;
    }


}
