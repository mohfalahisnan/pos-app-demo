import { getCategories } from "@/server/product";
import ProductForm from "./product-form";

async function Page() {
  const categories = await getCategories();
  return (
    <div className="bg-card py-4 rounded">
      <ProductForm categories={categories} />
    </div>
  );
}

export default Page;
