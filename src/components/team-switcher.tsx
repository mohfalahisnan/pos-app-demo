"use client";

import { AtomIcon, ChevronsUpDown, LoaderIcon, Plus } from "lucide-react";
import * as React from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  // DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  getSelectedWarehouse,
  getWarehouses,
  setSelectedWarehouse,
} from "@/Storage/Data";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export function TeamSwitcher() {
  const [isAdd, setIsAdd] = React.useState(false);
  const { isMobile } = useSidebar();
  const warehouses = getWarehouses();
  const selectedWarehouse = getSelectedWarehouse();
  const [warehouse, setWarehouse] = React.useState(selectedWarehouse);
  const router = useRouter();

  React.useEffect(() => {
    if (warehouse) setSelectedWarehouse(warehouse.id);
    router.refresh();
  }, [warehouse]);

  if (!warehouses || !selectedWarehouse)
    return (
      <SidebarMenuButton className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground h-12">
        <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
          <LoaderIcon className="size-4" />
        </div>
        <div className="grid flex-1 text-left text-sm leading-tight">
          <span className="truncate font-semibold">loading...</span>
          <span className="truncate text-xs">loading...</span>
        </div>
        <ChevronsUpDown className="ml-auto" />
      </SidebarMenuButton>
    );
  return (
    <>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <AtomIcon className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    {selectedWarehouse
                      ? selectedWarehouse?.name
                      : warehouses[0].name}
                  </span>
                  <span className="truncate text-xs">
                    {selectedWarehouse
                      ? selectedWarehouse?.location
                      : warehouses[0].location}
                  </span>
                </div>
                <ChevronsUpDown className="ml-auto" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
              align="start"
              side={isMobile ? "bottom" : "right"}
              sideOffset={4}
            >
              <DropdownMenuLabel className="text-xs text-muted-foreground">
                Warehouse
              </DropdownMenuLabel>
              {warehouses.map((warehouse) => (
                <DropdownMenuItem
                  key={warehouse.name}
                  onClick={() => setWarehouse(warehouse)}
                  className="gap-2 p-2"
                >
                  <div className="flex size-6 items-center justify-center rounded-sm border">
                    <AtomIcon className="size-4 shrink-0" />
                  </div>
                  {warehouse.name}
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => setIsAdd(true)}
                className="flex items-center gap-2 p-2"
              >
                <Plus size={20} /> <div className="mt-0.5">Add Warehouse</div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>

      <Dialog onOpenChange={setIsAdd} open={isAdd}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Warehouse</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value="Example Warehouse"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="location" className="text-right">
                Location
              </Label>
              <Input id="location" value="location" className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
