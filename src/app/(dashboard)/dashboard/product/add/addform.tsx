"use client";

import { Button } from "@/components/ui/button";
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
import { Textarea } from "@/components/ui/textarea";
import { SingleImageDropzone } from "@/components/upload/single-image";
import { useToast } from "@/hooks/use-toast";
import { useEdgeStore } from "@/lib/edgestore";
import { addProduct } from "@/Storage/Data";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  name: z.string(),
  desc: z.string(),
  price: z.number(),
});

export default function AddProductForm() {
  const [file, setFile] = useState<File>();
  const [progress, setProgress] = useState<
    "PENDING" | "COMPLETE" | "ERROR" | number
  >("PENDING");
  const [uploadRes, setUploadRes] = useState<{
    url: string;
    filename: string;
  }>();
  const { toast } = useToast();
  const { edgestore } = useEdgeStore();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
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

        addProduct({
          image: res.url,
          name: values.name,
          price: values.price.toString(),
        });
        toast({
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">
                {JSON.stringify(values, null, 2)}
              </code>
            </pre>
          ),
        });
        return router.push("/dashboard/product");
      } catch (error) {
        console.error("Form submission error", error);
        toast({
          title: "Error",
          description: "Failed to submit the form. Please try again.",
          variant: "destructive",
        });
      }
    } else {
      toast({
        title: "Error",
        description: "No Image Selected",
        variant: "destructive",
      });
    }
  }

  return (
    <div className="p-4 bg-card rounded">
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
              maxSize: 1024 * 1024 * 1, // 1 MB
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
            name="desc"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Desc</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="desc..."
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormDescription>Your description here</FormDescription>
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
                    placeholder="100000"
                    type="number"
                    onChange={(e) => field.onChange(parseInt(e.target.value))}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}
