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
import { getSelectedWarehouse, setSelectedWarehouse } from "@/Storage/Data";

import { queryClient } from "@/app/query-provider";
import { useToast } from "@/hooks/use-toast";
import { addWarehouse, getWarehouses } from "@/server/warehouse";
import { zodResolver } from "@hookform/resolvers/zod";
import { Prisma } from "@prisma/client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
  const { isMobile } = useSidebar();
  const [isAdd, setIsAdd] = React.useState(false);
  const data = useQuery({
    queryKey: ["warehouses"],
    queryFn: async () => await getWarehouses(),
  });
  const warehouses = data.data;

  const selectedWarehouse = getSelectedWarehouse();
  const [warehouse, setWarehouse] = React.useState<string | null>(
    selectedWarehouse
  );
  const router = useRouter();

  React.useEffect(() => {
    if (warehouse) setSelectedWarehouse(warehouse);
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
                  <span className="truncate font-semibold capitalize">
                    {selectedWarehouse
                      ? warehouses.find((val) => val.id === selectedWarehouse)
                          ?.name
                      : warehouses[0].name}
                  </span>
                  <span className="truncate text-xs capitalize">
                    {selectedWarehouse
                      ? warehouses.find((val) => val.id === selectedWarehouse)
                          ?.location
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
                  onClick={() => setWarehouse(warehouse.id)}
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

      <DialogAddWarehouse isAdd={isAdd} setIsAdd={setIsAdd} />
    </>
  );
}

// Schema validasi dengan Zod
const warehouseSchema = z.object({
  name: z.string().min(1, "Name is required"),
  code: z.string().min(1, "Code is required"),
  location: z.string().min(1, "Location is required"),
});

type WarehouseFormValues = z.infer<typeof warehouseSchema>;

const DialogAddWarehouse = ({
  isAdd,
  setIsAdd,
}: {
  isAdd: boolean;
  setIsAdd: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<WarehouseFormValues>({
    resolver: zodResolver(warehouseSchema),
    defaultValues: {
      name: "",
      location: "",
    },
  });
  const router = useRouter();
  const { toast } = useToast();
  const warehouseMutation = useMutation({
    mutationFn: async (data: Prisma.WarehouseCreateInput) =>
      await addWarehouse(data),
    onSuccess: () => {
      toast({
        description: "Warehouse Added!",
      });
      queryClient.invalidateQueries({ queryKey: ["warehouses"] });
    },
  });

  const onSubmit = async (data: WarehouseFormValues) => {
    console.log("Submitted Data:", data);
    try {
      const res = warehouseMutation.mutate({
        ...data,
      });
      setIsAdd(false);
      router.refresh();
      return res;
    } catch (error) {
      console.log(error);
      setIsAdd(false);
      toast({
        title: "Error",
        description: "Failed to create warehouse!",
        variant: "destructive",
      });
    }
  };
  return (
    <Dialog onOpenChange={setIsAdd} open={isAdd}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Warehouse</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              {...register("name")}
              className="col-span-3"
              placeholder="Example Warehouse"
            />
            {errors.name && (
              <p className="col-span-4 text-red-500 text-sm">
                {errors.name.message}
              </p>
            )}
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="code" className="text-right">
              Code
            </Label>
            <Input
              id="code"
              {...register("code")}
              className="col-span-3"
              placeholder="Example WRH1"
            />
            {errors.code && (
              <p className="col-span-4 text-red-500 text-sm">
                {errors.code.message}
              </p>
            )}
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="location" className="text-right">
              Location
            </Label>
            <Input
              id="location"
              {...register("location")}
              className="col-span-3"
              placeholder="Location"
            />
            {errors.location && (
              <p className="col-span-4 text-red-500 text-sm">
                {errors.location.message}
              </p>
            )}
          </div>
          <DialogFooter>
            <Button type="submit">Save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
