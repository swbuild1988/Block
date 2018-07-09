import { Component, OnInit, HostListener } from '@angular/core';
import { ShapeBase } from '../shape/shapeBase';
import { ShapeT } from '../shape/shapeT';
import { ShapeSquare } from '../shape/shapeSquare';
import * as myGlobals from '../../globals';
import { Log } from '../../log';
import { Point } from '../type/point';
import { ShapeL } from '../shape/shapeL';
import { ShapeL2 } from '../shape/shapeL2';
import { ShapeZ } from '../shape/shapeZ';
import { ShapeZ2 } from '../shape/shapeZ2';
import { ShapeI } from '../shape/shapeI';

@Component({
  selector: 'app-scene',
  templateUrl: './scene.component.html',
  styleUrls: ['./scene.component.css']
})
export class SceneComponent implements OnInit {
  // 当前活动的形状
  currentShape: ShapeBase;
  // 下一个形状
  nextShape: ShapeBase;
  // 砖块大小
  size = myGlobals.block_size;
  // 场景大小
  scene_width = myGlobals.scene_width;
  scene_height = myGlobals.scene_height;
  // 帧数
  frame = 1.0;
  // 是否运作
  isRun = false;
  // 是否游戏结束
  isGameOver = false;
  // 场景中现有的方块
  stockBlocks: Point[] = [];
  stockScene: Array<Array<number>>;
  // 分数
  score = 0;

  constructor() { }

  ngOnInit() {
    this.initData();
  }

  initData() {
    this.score = 0;
    this.isGameOver = false;
    this.isRun = false;

    this.currentShape = this.getNewShape();
    this.nextShape = this.getNewShape();
    this.stockScene = new Array<Array<number>>();
    for (let i = 0; i < this.scene_width; i++) {
      this.stockScene[i] = [];
      for (let j = 0; j < this.scene_height; j++) {
        this.stockScene[i][j] = 0;
      }
    }
    this.stockBlocks = [];

    // 启动定时器
    this.startTimer();
  }

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

  // 启动定时器
  startTimer() {
    setTimeout(() => {
      Log.info('定时器运作');
      // 如果游戏结束，则定时器退出
      if (this.isGameOver) {
        return;
      }

      if (this.isRun) {
        // 判断方块是否能继续往下
        if (this.canDown()) {
          this.currentShape.down();
        } else {
          // 当前回合结束
          this.roundOver();
        }
      }

      // 运行下一帧
      this.startTimer();
    }, 1000 / this.frame);
  }

  roundOver() {
    // 将当前方块固定在这个位置
    for (const block of this.currentShape.blocks) {
      this.stockBlocks.push(block);
      this.stockScene[block.x][block.y] = 1;
    }

    // 剔除一行满了的
    let clearNum = 0;
    for (let j = 0; j < this.scene_height; j++) {
      let isFull = true;
      for (let i = 0; i < this.scene_width; i++) {
        if (this.stockScene[i][j] === 0) {
          isFull = false;
          break;
        }
      }

      // 如果满了
      if (isFull) {
        // 清除行数加1
        clearNum++;

        // 先将stockScene这行删除
        for (let k = j; k > 0; k--) {
          for (let i = 0; i < this.scene_width; i++) {
            this.stockScene[i][k] = this.stockScene[i][k - 1];
          }
        }
        for (let i = 0; i < this.scene_width; i++) {
          this.stockScene[i][0] = 0;
        }

        // 将对应的block删除
        for (let index = 0; index < this.stockBlocks.length; index++) {
          const element = this.stockBlocks[index];
          if (element.y === j) {
            this.stockBlocks.splice(index, 1);
            index--;
          }
          if (element.y < j) {
            element.y++;
          }
        }
      }
    }
    this.score += (clearNum * (clearNum + 1)) / 2;
    Log.info('当前分数：', this.score);

    // 如果下一个一上来就碰到现有的，则游戏结束
    for (const block of this.nextShape.blocks) {
      if (this.stockScene[block.x][block.y] > 0) {
        this.gameOver();
        return;
      }
    }

    // 当前方块变成新的
    this.currentShape = this.nextShape;
    this.nextShape = this.getNewShape();
  }

  gameOver() {
    this.isGameOver = true;
    Log.info('游戏结束');
  }

  @HostListener('document:keydown', ['$event'])
  onKeyDown(e: KeyboardEvent) {
    Log.info('keyCode', e.keyCode);

    switch (e.keyCode) {
      // Space,W
      case 32:
      case 87:
        if (this.isRun && this.canRotate()) {
          this.currentShape.rotate();
        }
        break;
      // D
      case 68:
        if (this.isRun && this.canRight()) {
          this.currentShape.right();
        }
        break;
      // A
      case 65:
        if (this.isRun && this.canLeft()) {
          this.currentShape.left();
        }
        break;
      // S
      case 83:
        if (this.isRun && this.canDown()) {
          this.currentShape.down();
        }
        break;
      // F，暂停/继续
      case 70:
        this.isRun = !this.isRun;
        break;
      // R，重启游戏
      case 82:
        if (this.isGameOver) {
          this.initData();
        }
        break;

      case 38:
        this.addFrame();
        break;

      case 40:
        this.delFrame();
        break;
    }
  }

  canRotate(): boolean {
    const nextBlocks = this.currentShape.getNextShape();
    for (const block of nextBlocks) {
      if (block.y === this.scene_height - 1) {
        return false;
      }
      if (block.x === this.scene_width - 1) {
        return false;
      }
      if (block.x === 0) {
        return false;
      }
      if (this.stockScene[block.x - 1][block.y] > 0) {
        return false;
      }
    }

    return true;
  }

  canLeft(): boolean {
    for (const block of this.currentShape.blocks) {
      if (block.x === 0) {
        return false;
      }
      if (this.stockScene[block.x - 1][block.y] > 0) {
        return false;
      }
    }

    return true;
  }

  canRight(): boolean {
    for (const block of this.currentShape.blocks) {
      if (block.x === this.scene_width - 1) {
        return false;
      }
      if (this.stockScene[block.x + 1][block.y] > 0) {
        return false;
      }
    }
    return true;
  }

  canDown(): boolean {
    for (const block of this.currentShape.blocks) {
      if (block.y === this.scene_height - 1) {
        return false;
      }
      if (this.stockScene[block.x][block.y + 1] > 0) {
        return false;
      }
    }
    return true;
  }

  addFrame() {
    this.frame += 0.5;
    if (this.frame > 5) {
      this.frame = 5.0;
    }
  }

  delFrame() {
    this.frame -= 0.5;
    if (this.frame < 0.5) {
      this.frame = 0.5;
    }
  }
}
