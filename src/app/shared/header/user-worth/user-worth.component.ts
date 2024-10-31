import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../services/common/common.service';

@Component({
  selector: 'app-user-worth',
  templateUrl: './user-worth.component.html',
  styleUrls: ['./user-worth.component.scss'],
})
export class UserWorthComponent  implements OnInit {

  constructor(private common: CommonService) { }

  ngOnInit() {}

}
