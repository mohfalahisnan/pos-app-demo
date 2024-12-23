"use client";
import {
  AudioWaveform,
  Command,
  GalleryVerticalEnd,
  Home,
  Monitor,
  Package,
  Settings2,
  Store,
  Wallet,
  WarehouseIcon,
} from "lucide-react";
import * as React from "react";

import { NavMain } from "@/components/nav-main";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { LogoutButton } from "./auth-button";
import { NavProjects } from "./nav-projects";
import { TeamSwitcher } from "./team-switcher";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Transaction",
      url: "/dashboard/order",
      icon: Wallet,
      isActive: true,
      items: [
        {
          title: "Order",
          url: "/dashboard/order/list",
        },
        {
          title: "Shipping",
          url: "/dashboard/shipping",
        },
        {
          title: "Wallet",
          url: "/dashboard/wallet",
        },
      ],
    },

    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Warehouse",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "home",
      url: "/dashboard",
      icon: Home,
    },
    {
      name: "Point Of Sales",
      url: "/pos",
      icon: Monitor,
    },
    {
      name: "Warehouse",
      url: "#",
      icon: WarehouseIcon,
    },
    {
      name: "Store",
      url: "#",
      icon: Store,
    },
    {
      name: "Product",
      url: "/dashboard/product",
      icon: Package,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <NavProjects projects={data.projects} />
        <NavMain items={data.navMain} />
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
