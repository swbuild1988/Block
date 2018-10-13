import { Component, OnInit, HostListener } from '@angular/core';
import * as myGlobals from '../../../globals';
import { Log } from '../../tool/log';
import { Point } from '../../class/type/point';
import { BlockService } from '../../service/block.service';
import { MessageService } from '../../service/message.service';

@Component({
    selector: 'app-scene',
    templateUrl: './scene.component.html',
    styleUrls: ['./scene.component.css']
})
export class SceneComponent implements OnInit {
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

    constructor(private messageService: MessageService, public blockService: BlockService) { }

    ngOnInit() {
        this.initData();
    }

    initData() {
        this.blockService.clearScore();
        this.messageService.setMessage('按 F 启动游戏');
        this.isGameOver = false;
        this.isRun = false;

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
                if (this.blockService.canDown(this.scene_height, this.stockScene)) {
                    this.blockService.currentShape.down();
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
        for (const block of this.blockService.currentShape.blocks) {
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

        this.blockService.addScore(clearNum);

        // 如果下一个一上来就碰到现有的，则游戏结束
        for (const block of this.blockService.nextShape.blocks) {
            if (this.stockScene[block.x][block.y] > 0) {
                this.gameOver();
                return;
            }
        }

        this.blockService.next();
    }

    gameOver() {
        this.isGameOver = true;
        Log.info('游戏结束');
        this.messageService.setMessage('游戏结束,按 R 重新开始');
    }

    @HostListener('document:keydown', ['$event'])
    onKeyDown(e: KeyboardEvent) {
        Log.info('keyCode', e.keyCode);

        switch (e.keyCode) {
            // Space,W
            case 32:
            case 87:
                if (this.isRun && this.blockService.canRotate(this.scene_width, this.scene_height, this.stockScene)) {
                    this.blockService.currentShape.rotate();
                }
                break;
            // D
            case 68:
                if (this.isRun && this.blockService.canRight(this.scene_width, this.stockScene)) {
                    this.blockService.currentShape.right();
                }
                break;
            // A
            case 65:
                if (this.isRun && this.blockService.canLeft(this.stockScene)) {
                    this.blockService.currentShape.left();
                }
                break;
            // S
            case 83:
                if (this.isRun && this.blockService.canDown(this.scene_height, this.stockScene)) {
                    this.blockService.currentShape.down();
                }
                break;
            // F，暂停/继续
            case 70:
                this.isRun = !this.isRun;
                this.messageService.setMessage('按 F ' + (this.isRun ? '暂停' : '启动') + '游戏');
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
