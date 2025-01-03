'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Prisma } from '@prisma/client';
import { useMutation, useQuery } from '@tanstack/react-query';
import { AtomIcon, ChevronsUpDown, LoaderIcon, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { queryClient } from '@/app/query-provider';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  // DropdownMenuShortcut,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from '@/components/ui/sidebar';
import { useToast } from '@/hooks/use-toast';
import { getSelectedStore, setSelectedStore } from '@/lib/localstorage';
import { addStore, getStores } from '@/server/store';

import { Button } from './ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';

export function StoreSwithcer() {
  const { isMobile } = useSidebar();
  const [isAdd, setIsAdd] = React.useState(false);
  const data = useQuery({
    queryKey: ['stores'],
    queryFn: async () => await getStores()
  });
  const stores = data.data;

  const selectedStore = getSelectedStore();
  const [store, setStore] = React.useState<string | null>(selectedStore);
  const router = useRouter();

  React.useEffect(() => {
    if (stores) {
      if (selectedStore === null) setSelectedStore(stores[0].id);
    }
    if (store) setSelectedStore(store);
    router.refresh();
  }, [store]);

  if (!stores)
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
              <SidebarMenuButton size="lg" className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <AtomIcon className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold capitalize">
                    {selectedStore ? stores.find(val => val.id === selectedStore)?.name : stores[0].name}
                  </span>
                  <span className="truncate text-xs capitalize">
                    {selectedStore ? stores.find(val => val.id === selectedStore)?.location : stores[0].location}
                  </span>
                </div>
                <ChevronsUpDown className="ml-auto" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
              align="start"
              side={isMobile ? 'bottom' : 'right'}
              sideOffset={4}
            >
              <DropdownMenuLabel className="text-xs text-muted-foreground">Warehouse</DropdownMenuLabel>
              {stores.map(store => (
                <DropdownMenuItem key={store.name} onClick={() => setStore(store.id)} className="gap-2 p-2">
                  <div className="flex size-6 items-center justify-center rounded-sm border">
                    <AtomIcon className="size-4 shrink-0" />
                  </div>
                  {store.name}
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setIsAdd(true)} className="flex items-center gap-2 p-2">
                <Plus size={20} /> <div className="mt-0.5">Add Store</div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>

      <DialogAddStore isAdd={isAdd} setIsAdd={setIsAdd} />
    </>
  );
}

// Schema validasi dengan Zod
const storeSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  code: z.string().min(1, 'Code is required'),
  location: z.string().min(1, 'Location is required')
});

type StoreFormValues = z.infer<typeof storeSchema>;

const DialogAddStore = ({ isAdd, setIsAdd }: { isAdd: boolean; setIsAdd: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<StoreFormValues>({
    resolver: zodResolver(storeSchema),
    defaultValues: {
      name: '',
      location: ''
    }
  });
  const router = useRouter();
  const { toast } = useToast();
  const storeMutation = useMutation({
    mutationFn: async (data: Prisma.StoreCreateInput) => await addStore(data),
    onSuccess: () => {
      toast({
        description: 'Store Added!'
      });
      reset({
        name: '',
        code: '',
        location: ''
      });
      queryClient.invalidateQueries({ queryKey: ['stores'] });
    }
  });

  const onSubmit = async (data: StoreFormValues) => {
    console.log('Submitted Data:', data);
    try {
      const res = storeMutation.mutate({
        ...data
      });
      setIsAdd(false);
      router.refresh();
      return res;
    } catch (error) {
      console.log(error);
      setIsAdd(false);
      toast({
        title: 'Error',
        description: 'Failed to create store!',
        variant: 'destructive'
      });
    }
  };
  return (
    <Dialog onOpenChange={setIsAdd} open={isAdd}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Store</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" {...register('name')} className="col-span-3" placeholder="Example Toko Sepatu" />
            {errors.name && <p className="col-span-4 text-red-500 text-sm">{errors.name.message}</p>}
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="code" className="text-right">
              Code
            </Label>
            <Input id="code" {...register('code')} className="col-span-3" placeholder="Example WRH1" />
            {errors.code && <p className="col-span-4 text-red-500 text-sm">{errors.code.message}</p>}
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="location" className="text-right">
              Location
            </Label>
            <Input id="location" {...register('location')} className="col-span-3" placeholder="Location" />
            {errors.location && <p className="col-span-4 text-red-500 text-sm">{errors.location.message}</p>}
          </div>
          <DialogFooter>
            <Button type="submit">Save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
