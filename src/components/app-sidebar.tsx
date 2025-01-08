'use client';
import {
  AudioWaveform,
  BarChart,
  Check,
  Command,
  GalleryVerticalEnd,
  Home,
  LayoutDashboard,
  Monitor,
  Package,
  Package2,
  Settings2,
  Store,
  Users,
  Wallet,
  WarehouseIcon
} from 'lucide-react';
import * as React from 'react';

import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from '@/components/ui/sidebar';

import { LogoutButton } from './auth-button';
import { NavGroup } from './nav-group';
import { StoreSwithcer } from './store-switcher';

// This is sample data.
const data = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg'
  },
  teams: [
    {
      name: 'Acme Inc',
      logo: GalleryVerticalEnd,
      plan: 'Enterprise'
    },
    {
      name: 'Acme Corp.',
      logo: AudioWaveform,
      plan: 'Startup'
    },
    {
      name: 'Evil Corp.',
      logo: Command,
      plan: 'Free'
    }
  ],
  navMain: [
    {
      title: 'Transaction',
      url: '/dashboard/order',
      icon: Wallet,
      isActive: true,
      items: [
        {
          title: 'Order',
          url: '/dashboard/order/list'
        },
        {
          title: 'Shipping',
          url: '/dashboard/shipping'
        },
        {
          title: 'Wallet',
          url: '/dashboard/wallet'
        }
      ]
    },

    {
      title: 'Settings',
      url: '#',
      icon: Settings2,
      items: [
        {
          title: 'General',
          url: '#'
        },
        {
          title: 'Warehouse',
          url: '#'
        }
      ]
    }
  ],
  projects: [
    {
      name: 'home',
      url: '/dashboard',
      icon: Home
    },
    {
      name: 'Point Of Sales',
      url: '/pos',
      icon: Monitor
    },
    {
      name: 'Warehouse',
      url: '#',
      icon: WarehouseIcon
    },
    {
      name: 'Store',
      url: '#',
      icon: Store
    },
    {
      name: 'Product',
      url: '/dashboard/product',
      icon: Package
    }
  ],
  navGroups: [
    {
      title: 'General',
      items: [
        {
          title: 'Dashboard',
          url: '/',
          icon: LayoutDashboard
        },
        {
          title: 'Order',
          url: '/dashboard/order',
          icon: Wallet,
          badge: '4'
        },
        {
          title: 'Product',
          url: '/dashboard/product',
          icon: Package
        },
        {
          title: 'Tasks',
          url: '/tasks',
          icon: Check
        },
        {
          title: 'Point Of Sales',
          url: '/pos',
          icon: Monitor
        }
      ]
    },
    {
      title: 'Management',
      items: [
        {
          title: 'Warehouse',
          icon: WarehouseIcon,
          items: [
            {
              title: 'Warehouse',
              url: '/warehouse',
              icon: WarehouseIcon
            },
            {
              title: 'Product',
              url: '/warehouse/product',
              icon: Package
            },
            {
              title: 'Stock',
              url: '/warehouse/stock',
              icon: Package2
            },
            {
              title: 'Users',
              url: '/warehouse/users',
              icon: Users
            },
            {
              title: 'Reports',
              url: '/warehouse/reports',
              icon: BarChart
            },
            {
              title: 'Settings',
              url: '/warehouse/settings',
              icon: Settings2
            }
          ]
        },
        {
          title: 'Store',
          icon: Store,
          items: [
            {
              title: 'Store',
              url: '/store',
              icon: Store
            },
            {
              title: 'Product',
              url: '/store/product',
              icon: Package
            },
            {
              title: 'Stock',
              url: '/store/stock',
              icon: Package2
            },
            {
              title: 'Users',
              url: '/store/users',
              icon: Users
            },
            {
              title: 'Reports',
              url: '/store/reports',
              icon: BarChart
            },
            {
              title: 'Settings',
              url: '/store/settings',
              icon: Settings2
            }
          ]
        }
      ]
    }
  ]
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        {/* <TeamSwitcher /> */}
        <StoreSwithcer />
      </SidebarHeader>
      <SidebarContent>
        {data.navGroups.map(props => (
          <NavGroup key={props.title} {...props} />
        ))}
        {/* <NavProjects projects={data.projects} />
        <NavMain items={data.navMain} /> */}
      </SidebarContent>
      <SidebarFooter>
        {/* <NavUser user={data.user} /> */}
        {/* <div className="flex items-center justify-center py-4">
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div> */}
        <div className="flex py-4 w-full items-center justify-center">
          <LogoutButton />
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
