'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader, Plus, Trash } from 'lucide-react';
import { useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useProduct, useProductMutation } from '@/hooks/product';
import { useToast } from '@/hooks/use-toast';
import { getSelectedStore } from '@/lib/localstorage';
import { InputVariantProduct } from '@/server/product';

const formSchema = z.object({
  variant: z.array(
    z.object({
      name: z.string().nonempty('Variant name is required'),
      attributes: z.array(
        z.object({
          name: z.string().nonempty('Attribute name is required'),
          price: z.string().regex(/^\d+$/, 'Price must be a number'),
          stock: z.string().regex(/^\d+$/, 'Stock must be a number')
        })
      )
    })
  )
});

function FormVariant({ id }: { id: string }) {
  const product = useProduct(id);
  const storeId = getSelectedStore();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      variant: [
        {
          name: 'unit',
          attributes: [
            {
              name: 'pcs',
              price: '100',
              stock: '1'
            }
          ]
        }
      ]
    }
  });
  const {
    control,
    handleSubmit,
    register,
    formState: { errors }
  } = form;

  const {
    fields: variantFields,
    append: appendVariant,
    remove: removeVariant
  } = useFieldArray({
    control,
    name: 'variant'
  });

  const handleAddVariant = () => {
    appendVariant({
      name: '',
      attributes: [{ name: '', price: '', stock: '' }]
    });
  };
  const { toast } = useToast();
  const handleRemoveVariant = (index: number) => {
    removeVariant(index);
  };

  const mutation = useProductMutation({});

  const onSubmit = (data: InputVariantProduct) => {
    try {
      if (!storeId) {
        toast({ description: 'Please select a store' });
        return;
      }
      mutation.mutate({
        productId: id,
        storeId: storeId || '',
        data: data
      });
    } catch (error) {
      console.log(error);
    }
  };

  if (product.isLoading)
    return (
      <div className="w-full flex items-center justify-center">
        <Loader className="animate-spin" />
      </div>
    );

  return (
    <Card className="p-6">
      <div className="text-xl my-2 font-medium">Add Variant To Products</div>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {variantFields.map((variant, variantIndex) => (
            <FormAttribute
              control={control}
              register={register}
              variant={variant}
              variantIndex={variantIndex}
              errors={errors}
              handleRemoveVariant={handleRemoveVariant}
              key={variantIndex}
            />
          ))}

          <div className="flex justify-end gap-2 mt-4">
            <Button type="button" variant={'secondary'} onClick={handleAddVariant}>
              <Plus /> Variant
            </Button>

            <Button type="submit">Submit</Button>
          </div>
        </form>
      </Form>
    </Card>
  );
}

export default FormVariant;

const FormAttribute = ({ variant, control, variantIndex, register, errors, handleRemoveVariant }: any) => {
  const {
    fields: attributeFields,
    append: appendAttribute,
    remove: removeAttribute
  } = useFieldArray({
    control,
    name: `variant.${variantIndex}.attributes`
  });

  return (
    <div key={variant.id} className="mt-2 mb-8">
      <div className="flex gap-2 items-center">
        <h4 className="w-32">Variant Name :</h4>
        <Input {...register(`variant.${variantIndex}.name`)} placeholder="Variant Name" />
        {errors.variant?.[variantIndex]?.name && <p>{errors.variant[variantIndex].name.message}</p>}
      </div>

      <h5 className="mt-4">Attributes:</h5>
      {attributeFields.map((attribute, attrIndex) => (
        <div key={attribute.id} className="flex gap-2 my-2">
          <Input {...register(`variant.${variantIndex}.attributes.${attrIndex}.name`)} placeholder="Attribute Name" />
          <Input {...register(`variant.${variantIndex}.attributes.${attrIndex}.price`)} placeholder="Price" />
          <Input {...register(`variant.${variantIndex}.attributes.${attrIndex}.stock`)} placeholder="Stock" />
          <Button type="button" onClick={() => removeAttribute(attrIndex)} variant={'destructive'}>
            <Trash />
          </Button>
        </div>
      ))}
      <div className="mt-4 flex gap-2">
        <Button type="button" onClick={() => appendAttribute({ name: '', price: '', stock: '' })}>
          <Plus /> Attribute
        </Button>
        <Button type="button" onClick={() => handleRemoveVariant(variantIndex)} variant={'destructive'}>
          <Trash /> Variant
        </Button>
      </div>
    </div>
  );
};
