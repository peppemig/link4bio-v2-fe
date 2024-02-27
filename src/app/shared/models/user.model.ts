export interface User {
  id: string;
  email: string;
  displayName: string;
  avatarUrl: string | null;
  location: string | null;
  bio: string | null;
}
