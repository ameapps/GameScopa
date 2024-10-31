import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { UserLevelsComponent } from './header/user-levels/user-levels.component';
import { UserWorthComponent } from './header/user-worth/user-worth.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, UserLevelsComponent, UserWorthComponent],
  imports: [CommonModule, SharedRoutingModule, HttpClientModule],
  exports: [HeaderComponent, FooterComponent, HttpClientModule],
})
export class SharedModule {}
