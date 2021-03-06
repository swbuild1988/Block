import { Component, OnInit, Input } from '@angular/core';
import { Point } from '../../class/type/point';
import * as myGlobals from '../../../globals';

@Component({
  selector: 'app-block',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.css']
})
export class BlockComponent implements OnInit {

  @Input() position: Point;
  @Input() offset_x = 0;
  @Input() offset_y = 0;
  size = myGlobals.block_size;

  constructor() {
    this.position = new Point(5, 1);
  }

  ngOnInit() {
  }

  getColor() {
    return this.position.color;
  }

}
