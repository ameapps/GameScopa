import { Component, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { DefaultConfig } from './shared/models/defaultConfig';
import { HttpClient } from '@angular/common/http';
import { CommonService } from './shared/services/common/common.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private http_service: HttpClient, private common: CommonService) {}

  async ngOnInit(): Promise<void> {
    this.common.appConfig = await this.loadAppConfig();
    alert(JSON.stringify(this.common.appConfig));
  }

  async loadAppConfig(): Promise<DefaultConfig> {
    const value = await lastValueFrom(
      this.http_service.get<DefaultConfig>('assets/config/default-config.json')
    );
    return value;
  }
}
