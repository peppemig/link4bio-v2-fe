import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { NgIconsModule } from '@ng-icons/core';
import {
  ionLink,
  ionLogoGoogle,
  ionArrowForward,
  ionImage,
  ionSave,
  ionAddCircle,
  ionLogoFacebook,
  ionLogoInstagram,
  ionLogoTiktok,
  ionLogoYoutube,
  ionLogoApple,
  ionLogoTwitter,
  ionMail,
  ionTrashBin,
  ionLocation,
  ionClose,
  ionCloudUpload,
} from '@ng-icons/ionicons';
import {
  remixSpotifyFill,
  remixPhoneFill,
  remixEdit2Fill,
} from '@ng-icons/remixicon';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    NgIconsModule.withIcons({
      ionLink,
      ionLogoGoogle,
      ionArrowForward,
      ionImage,
      ionSave,
      ionAddCircle,
      ionLogoFacebook,
      ionLogoInstagram,
      ionLogoTiktok,
      ionLogoYoutube,
      ionLogoApple,
      ionLogoTwitter,
      ionMail,
      remixSpotifyFill,
      remixPhoneFill,
      ionTrashBin,
      ionLocation,
      remixEdit2Fill,
      ionClose,
      ionCloudUpload,
    }),
  ],
  exports: [MaterialModule, NgIconsModule, ReactiveFormsModule, FormsModule],
})
export class SharedModule {}