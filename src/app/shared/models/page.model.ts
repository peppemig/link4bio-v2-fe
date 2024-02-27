import { Button } from './button.model';
import { Link } from './link.model';
import { Theme } from './theme.model';
import { User } from './user.model';

export interface Page {
  id: number;
  uri: string;
  user: User;
  links: Link[];
  buttons: Button[];
  theme: Theme;
}
