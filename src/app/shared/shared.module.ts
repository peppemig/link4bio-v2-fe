import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxSkeletonModule } from 'ngx-skeleton';
import { NgxLoadingModule } from 'ngx-loading';
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
import { cssSpinner } from '@ng-icons/css.gg';
import { GetButtonIconPipe } from './pipes/get-button-icon.pipe';
import { GetButtonLabelPipe } from './pipes/get-button-label.pipe';
import { NgxColorsModule } from 'ngx-colors';
import { InputSkeletonComponent } from './components/input-skeleton/input-skeleton.component';

@NgModule({
  declarations: [GetButtonIconPipe, GetButtonLabelPipe, InputSkeletonComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    NgxSkeletonModule,
    NgxLoadingModule.forRoot({}),
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
      cssSpinner,
    }),
  ],
  exports: [
    MaterialModule,
    NgIconsModule,
    NgxLoadingModule,
    ReactiveFormsModule,
    FormsModule,
    GetButtonIconPipe,
    GetButtonLabelPipe,
    NgxColorsModule,
    NgxSkeletonModule,
    InputSkeletonComponent,
  ],
})
export class SharedModule {}
