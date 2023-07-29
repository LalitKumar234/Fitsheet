import Card from "@/components/Card";

export default async function Page() {

  const res = await fetch(`${process.env.PERSONAL_HOST}/api/product/getproduct`,
    {
      method: 'GET',
      headers: {
        'token': 'secret123'  // the authentication token
      },
    },
    {
      next: { revalidate: 100 }
    });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();

  return (
    <div className=" mt-32">
      <div className="flex">
        <div className="hidden md:block">
          {/* <h1 className="text-3xl font-semibold tracking-wide mt-6 mb-2">All Products</h1>
          <p className="text-gray-500 mb-6">A list of all products</p> */}

        </div>
        <div className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5 max-w-6xl mx-auto py-4">
          {data.map((result) => (
            <Card key={result._id} result={result} />
          ))}
        </div>
      </div>
      <div className="flex justify-around bg-slate-200 items-center pb-2 sticky bottom-0 md:hidden">
        <h3 className="text-3xl font-semibold tracking-wide mt-6 mb-2">All Products</h3>
        <h3 className="text-3xl font-semibold tracking-wide mt-6 mb-2">Filter</h3>
      </div>
    </div>
  )
}
