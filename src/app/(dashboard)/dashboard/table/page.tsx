import { prisma } from '@/lib/prisma';

import TableData from './table-data';

async function Page() {
  const data = await prisma.product.findMany();
  console.log(data[0]);
  return (
    <div>
      <TableData data={data} />
    </div>
  );
}

export default Page;
