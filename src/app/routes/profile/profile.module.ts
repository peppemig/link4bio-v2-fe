import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { DetailsComponent } from './details/details.component';
import { StatsComponent } from './stats/stats.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CreateComponent } from './create/create.component';
import { UserDetailsFormComponent } from './details/components/user-details-form/user-details-form.component';
import { ThemeFormComponent } from './details/components/theme-form/theme-form.component';
import { ButtonsFormComponent } from './details/components/buttons-form/buttons-form.component';
import { LinksFormComponent } from './details/components/links-form/links-form.component';
import { AvatarUploadDialogComponent } from './details/components/avatar-upload-dialog/avatar-upload-dialog.component';
import { EditButtonDialogComponent } from './details/components/edit-button-dialog/edit-button-dialog.component';
import { EditLinkDialogComponent } from './details/components/edit-link-dialog/edit-link-dialog.component';

@NgModule({
  declarations: [
    ProfileComponent,
    DetailsComponent,
    StatsComponent,
    CreateComponent,
    UserDetailsFormComponent,
    ThemeFormComponent,
    ButtonsFormComponent,
    LinksFormComponent,
    AvatarUploadDialogComponent,
    EditButtonDialogComponent,
    EditLinkDialogComponent,
  ],
  imports: [CommonModule, ProfileRoutingModule, SharedModule],
})
export class ProfileModule {}
