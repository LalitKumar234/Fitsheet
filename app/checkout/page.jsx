"use client";

export default function Page() {

    const data = {
        name: "John Doe",
        address: "123 Main St",
        city: "Anytown",
        state: "CA",
        zip: "12345",
        country: "USA",
        phone: "123-456-7890",
        email: "abc@gmail.com",
    }

    return (
        <div className="flex">
            <div className="w-2/4">
                <div>
                    <h1 className="font-bold text-2xl m-4 pl-4">Shipping Address</h1>
                </div>
                <form className="flex flex-col bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Name" value={data.name} />
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Address" value={data.address} />
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="City" value={data.city} />
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="State" value={data.state} />
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Zip" value={data.zip} />
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Country" value={data.country} />
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Phone" value={data.phone} />
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Email" value={data.email} />
                </form>
            </div>
            <div>
                <h1 className="font-bold text-2xl m-4 pl-4">Order items</h1>
                <div className="w-2/4">
                    <form className="flex flex-col bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                        <div className="flex items-center mb-4 flex-col">
                            <div className="">
                                <ul>
                                    <li>Pillow colourfull</li>
                                    <li>Bedsheet</li>
                                    <li>Comforter</li>
                                </ul>
                            </div>
                            <div className="mt-10">
                                <h2 className="text-xl font-semibold">Continue</h2>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}