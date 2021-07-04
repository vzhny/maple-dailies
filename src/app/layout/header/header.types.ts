import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

interface NavLink {
  name: string;
  route: string;
  matchExactRouteUrl: boolean;
  icon?: IconDefinition;
}

export { NavLink };
