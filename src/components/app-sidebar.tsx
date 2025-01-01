'use client';
import {
  AudioWaveform,
  Blocks,
  BugIcon,
  Check,
  Command,
  GalleryVerticalEnd,
  Home,
  LayoutDashboard,
  Lock,
  LockIcon,
  MessageCircle,
  Monitor,
  Package,
  ServerOff,
  Settings2,
  Store,
  User,
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
          title: 'Tasks',
          url: '/tasks',
          icon: Check
        },
        {
          title: 'Apps',
          url: '/apps',
          icon: Package
        },
        {
          title: 'Chats',
          url: '/chats',
          badge: '3',
          icon: MessageCircle
        },
        {
          title: 'Users',
          url: '/users',
          icon: User
        }
      ]
    },
    {
      title: 'Pages',
      items: [
        {
          title: 'Auth',
          icon: LockIcon,
          items: [
            {
              title: 'Sign In',
              url: '/sign-in'
            },
            {
              title: 'Sign In (2 Col)',
              url: '/sign-in-2'
            },
            {
              title: 'Sign Up',
              url: '/sign-up'
            },
            {
              title: 'Forgot Password',
              url: '/forgot-password'
            },
            {
              title: 'OTP',
              url: '/otp'
            }
          ]
        },
        {
          title: 'Errors',
          icon: BugIcon,
          items: [
            {
              title: 'Unauthorized',
              url: '/401',
              icon: Lock
            },
            {
              title: 'Forbidden',
              url: '/403',
              icon: User
            },
            {
              title: 'Not Found',
              url: '/404',
              icon: User
            },
            {
              title: 'Internal Server Error',
              url: '/500',
              icon: ServerOff
            },
            {
              title: 'Maintenance Error',
              url: '/503',
              icon: Blocks
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
