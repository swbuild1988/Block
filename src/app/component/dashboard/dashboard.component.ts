import { Component, OnInit } from '@angular/core';
import * as myGlobals from '../../../globals';
import { BlockService } from '../../service/block.service';
import { Point } from '../../class/type/point';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  // 场景大小
  dashboard_width = myGlobals.dashboard_width * myGlobals.block_size;
  dashboard_height = myGlobals.scene_height * myGlobals.block_size;

  constructor(public blockService: BlockService) { }

  ngOnInit() {
  }

}
