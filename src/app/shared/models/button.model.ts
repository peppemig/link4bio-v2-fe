export interface Button {
  id: number;
  name:
    | 'FACEBOOK'
    | 'INSTAGRAM'
    | 'TIKTOK'
    | 'SPOTIFY'
    | 'YOUTUBE'
    | 'APPLE_MUSIC'
    | 'TWITTER'
    | 'EMAIL'
    | 'PHONE';
  url: string;
}
