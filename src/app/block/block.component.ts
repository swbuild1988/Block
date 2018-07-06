import { Component, OnInit, Input } from '@angular/core';
import { Point } from '../type/point';

@Component({
  selector: 'app-block',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.css']
})
export class BlockComponent implements OnInit {

  @Input() color: string = '#666666';
  @Input() position: Point;

  constructor() {
    this.position = new Point(5, 1);
  }

  ngOnInit() {
  }

  getColor() {
    return this.color;
  }

}
