import { Component, OnInit, HostListener } from '@angular/core';
import { ShapeBase } from '../shape/shapeBase';
import { ShapeT } from '../shape/shapeT';
import { ShapeSquare } from '../shape/shapeSquare';

@Component({
  selector: 'app-scene',
  templateUrl: './scene.component.html',
  styleUrls: ['./scene.component.css']
})
export class SceneComponent implements OnInit {

  // 当前活动的形状
  currentShape: ShapeBase;

  constructor() { }

  ngOnInit() {
    this.currentShape = new ShapeSquare();
    console.log(this.currentShape.blocks);
  }

  @HostListener('document:keydown', ['$event'])
  onKeyDown(e: KeyboardEvent) {
    // 空格
    if (e.keyCode == 32) {
      this.currentShape.rotate();
    }
  }


}
