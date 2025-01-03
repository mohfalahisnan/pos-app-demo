import Link from 'next/link';

import { Button } from '@/components/ui/button';

import FormVariant from './form-variant';

function VariantPage({ params: { id } }: { params: { id: string } }) {
  return (
    <div>
      <div className="flex justify-end mb-4">
        <Button asChild className="mt-4">
          <Link href={'/dashboard/product'}>Skip Variant</Link>
        </Button>
      </div>
      <FormVariant id={id} />
    </div>
  );
}

export default VariantPage;
