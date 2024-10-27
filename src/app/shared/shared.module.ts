import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { UserLevelsComponent } from './header/user-levels/user-levels.component';
import { UserWorthComponent } from './header/user-worth/user-worth.component';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, UserLevelsComponent, UserWorthComponent],
  imports: [CommonModule, SharedRoutingModule],
  exports: [HeaderComponent, FooterComponent],
})
export class SharedModule {}
