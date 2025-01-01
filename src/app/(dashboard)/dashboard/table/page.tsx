import { Card } from '@/components/ui/card';
import { prisma } from '@/lib/prisma';

import TableData from './table-data';

async function Page() {
  const data = await prisma.product.findMany();
  console.log(data[0]);
  return (
    <Card className="p-0 border overflow-hidden">
      <TableData data={data} />
    </Card>
  );
}

export default Page;
