export interface SidebarData {
  user: {
    name: string;
    email: string;
    avatar: string;
    role?: string;
  };
  teams: {
    name: string;
    icon: string;
    plan: string;
  }[];
  navGroups: NavGroup[] | Record<string, NavGroup[]>;
}

export interface NavGroup {
  title: string;
  items: (NavItem | NavCollapsible)[];
}

export interface NavItem {
  title: string;
  url: string;
  icon?: string;
  badge?: string;
}

export interface NavCollapsible {
  title: string;
  icon?: string;
  items: NavItem[];
  badge?: string;
}
