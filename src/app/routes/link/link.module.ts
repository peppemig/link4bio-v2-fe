import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LinkRoutingModule } from './link-routing.module';
import { LinkComponent } from './link/link.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { LinkSkeletonComponent } from './components/link-skeleton/link-skeleton.component';

@NgModule({
  declarations: [LinkComponent, LinkSkeletonComponent],
  imports: [CommonModule, LinkRoutingModule, SharedModule],
})
export class LinkModule {}
