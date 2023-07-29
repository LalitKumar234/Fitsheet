import ProductPage from "@/components/ProductPage";

export default async function Page({ params, searchParams }) {

  const id = searchParams?.prodId;
  if (!id || id === '') return <h1>No product found..</h1>;

  const res = await fetch(`${process.env.PERSONAL_HOST}/api/product/singleproduct?id=${id}`, { next: { revalidate: 10000 } });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await res.json();

  if (!data) {
    return <h1>No products found..</h1>
  } else {
    return (
      <ProductPage data={data} />
    );
  }
}
