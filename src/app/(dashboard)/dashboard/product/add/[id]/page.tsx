import FormVariant from "./form-variant";

function VariantPage({ params: { id } }: { params: { id: string } }) {
  return (
    <div>
      <FormVariant id={id} />
    </div>
  );
}

export default VariantPage;
