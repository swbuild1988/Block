import { Component, OnInit, HostListener } from '@angular/core';
import { ShapeBase } from '../shape/shapeBase';
import { ShapeT } from '../shape/shapeT';
import { ShapeSquare } from '../shape/shapeSquare';
import * as myGlobals from '../../globals';

@Component({
  selector: 'app-scene',
  templateUrl: './scene.component.html',
  styleUrls: ['./scene.component.css']
})
export class SceneComponent implements OnInit {

  // 当前活动的形状
  currentShape: ShapeBase;
  // 砖块大小
  size = myGlobals.block_size;

  constructor() { }

  ngOnInit() {
    this.currentShape = new ShapeT();
    console.log(this.currentShape.blocks);
  }

  @HostListener('document:keydown', ['$event'])
  onKeyDown(e: KeyboardEvent) {

    switch (e.keyCode) {
      // Space,W
      case 32:
      case 87:
        this.currentShape.rotate();
        break;
      // D
      case 68:
        this.currentShape.right();
        break;
      // A
      case 65:
        this.currentShape.left();
        break;
      // S
      case 83:
        this.currentShape.down();
        break;
    }

  }


}
