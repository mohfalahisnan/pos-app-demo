"use client";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { TagsInput } from "@/components/ui/tags-input";
import { Textarea } from "@/components/ui/textarea";
import { SingleImageDropzone } from "@/components/upload/single-image";
import { useToast } from "@/hooks/use-toast";
import { useEdgeStore } from "@/lib/edgestore";
import { cn } from "@/lib/utils";
import { addProduct } from "@/server/product";
import { zodResolver } from "@hookform/resolvers/zod";
import { Category } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import { Check, ChevronsUpDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import * as z from "zod";

const formSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number(),
  stock: z.number(),
  available: z.boolean().optional(),
  category: z.string(),
  tags: z.array(z.string()).nonempty("Please at least one item"),
});

export default function ProductForm({
  categories,
}: {
  categories: Category[];
}) {
  const [file, setFile] = useState<File>();
  const [progress, setProgress] = useState<
    "PENDING" | "COMPLETE" | "ERROR" | number
  >("PENDING");
  const [uploadRes, setUploadRes] = useState<{
    url: string;
    filename: string;
  }>();
  const { edgestore } = useEdgeStore();

  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tags: ["tags"],
      available: true,
    },
  });
  const addMutation = useMutation({
    mutationFn: async (
      values: z.infer<typeof formSchema> & { imgUrl: string }
    ) =>
      await addProduct({
        name: values.name,
        price: values.price,
        description: values.description,
        sku: "",
        warehouse: {
          connect: {
            id: "cm5556igv0003hh84e1rxpdoh",
          },
        },
        category: {
          connect: {
            name: values.category,
          },
        },
        imageUrl: values.imgUrl,
      }),

    onSuccess: (data) => {
      router.push(`/dashboard/product/add/${data.id}`);
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (file) {
      try {
        const res = await edgestore.publicFiles.upload({
          file,
          onProgressChange: async (newProgress) => {
            setProgress(newProgress);
            if (newProgress === 100) {
              // wait 1 second to set it to complete
              // so that the user can see it at 100%
              await new Promise((resolve) => setTimeout(resolve, 1000));
              setProgress("COMPLETE");
            }
          },
        });
        setUploadRes({
          url: res.url,
          filename: file.name,
        });
        toast({
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">
                {JSON.stringify(values, null, 2)}
                <br />
                {uploadRes?.filename}
              </code>
            </pre>
          ),
        });
        console.log({
          ...values,
          imageUrl: res.url,
        });
        addMutation.mutate({ imgUrl: res.url, ...values });
      } catch (error) {
        console.error("Form submission error", error);
        toast({
          description: "Failed to submit the form. Please try again.",
          variant: "destructive",
        });
      }
    }
  }

  return (
    <Form {...form}>
      {uploadRes && (
        <div className="mt-2">
          <a
            href={uploadRes.url}
            target="_blank"
            rel="noreferrer"
            className="underline"
          >
            {uploadRes.filename}
          </a>
        </div>
      )}
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 max-w-3xl mx-auto py-10"
      >
        <SingleImageDropzone
          height={200}
          width={200}
          value={file}
          onChange={setFile}
          disabled={progress !== "PENDING"}
          dropzoneOptions={{
            maxSize: 1024 * 1024 * 3, // 1 MB
          }}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="name" type="text" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="description..."
                  className="resize-none"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input
                  placeholder="100"
                  type="number"
                  onChange={(e) => field.onChange(parseInt(e.target.value))}
                  value={field.value}
                  ref={field.ref}
                  onBlur={field.onBlur}
                  name={field.name}
                />
              </FormControl>
              <FormDescription>
                This is your public display price.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="stock"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Stock</FormLabel>
              <FormControl>
                <Input
                  placeholder="1"
                  type="number"
                  onChange={(e) => field.onChange(parseInt(e.target.value))}
                  value={field.value}
                  ref={field.ref}
                  onBlur={field.onBlur}
                  name={field.name}
                />
              </FormControl>
              <FormDescription>
                This is your public display stock.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="available"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel>Available</FormLabel>
                <FormDescription>
                  if not available the product will not shown
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  //   disabled
                  //   aria-readonly
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Language</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-[200px] justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? categories.find(
                            (category) => category.name === field.value
                          )?.name
                        : "Select category"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search categories..." />
                    <CommandList>
                      <CommandEmpty>No category found.</CommandEmpty>
                      <CommandGroup>
                        {categories.map((category) => (
                          <CommandItem
                            value={category.name}
                            key={category.name}
                            onSelect={() => {
                              form.setValue("category", category.name);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                category.name === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {category.name}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormDescription>
                This is the category that will be used in the product.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Enter product tags</FormLabel>
              <FormControl>
                <TagsInput
                  value={field.value}
                  onValueChange={field.onChange}
                  placeholder="Enter your tags"
                />
              </FormControl>
              <FormDescription>Add tags.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
