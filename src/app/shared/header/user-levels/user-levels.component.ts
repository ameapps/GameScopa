import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../services/common/common.service';

@Component({
  selector: 'app-user-levels',
  templateUrl: './user-levels.component.html',
  styleUrls: ['./user-levels.component.scss'],
})
export class UserLevelsComponent  implements OnInit {
  
  levelProgress: number = 70; // Ad esempio, 70%

  constructor(private common: CommonService) { }

  ngOnInit() {}

}
