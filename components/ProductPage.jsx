"use client";
import Image from "next/image"
import { useSession } from "next-auth/react";
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { FaShare } from 'react-icons/fa';


export default function ProductPage({ data }) {

    const { data: session, status } = useSession();
    const notify = () => toast("Wow so easy!");
    const [isOpen, setIsOpen] = useState(false)

    function closeModal() {
        const ele = document.getElementById("prodlink");
        navigator.clipboard.writeText(ele.innerText);
        setIsOpen(false)
    }

    const addToCart = async (prodId) => {
        // Handle add to cartPz

        try {

            if (status !== "authenticated") {
                window.alert("Please login first");
                return;
            }
            const data = { userId: session.user.id, productId: prodId, quantity: 1 };

            const response = await fetch('/api/user/cart/addToCart',
                {
                    method: 'POST',
                    body: JSON.stringify(data),
                });

            if (response.ok) {
                const data = await response.json();
                console.log(data); // Handle the API response data
            } else {
                console.error('API request failed');
            }
        } catch (error) {
            console.error('An error occurred', error);
        }
    }

    const buyNow = async () => {
        // Handle buy now
    }

    return (
        <div className="container xl:mx-[6rem] flex items-center justify-center h-screen gap-[5rem]">
            <div className="flex flex-wrap">
                {
                    data.images.map((img) =>
                        <Image
                            src={img}
                            alt={data.name}
                            width={600}
                            height={600}
                            placeholder="blur"
                            blurDataURL="data:image/png;base64,i VBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADjQH8mF3H4QAAAABJRU5ErkJggg=="
                        />)
                }
            </div>
            <div>
                <div className="flex items-center justify-between">
                    <h1 className="text-[2rem] font-semibold">{data.name}</h1>
                    <div className="">
                        <button
                            type="button"
                            onClick={() => setIsOpen(true)}
                            className="rounded-md bg-orange-500 px-4 py-2 text-sm font-medium text-white hover:bg-orange-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                        >
                            <FaShare />
                        </button>
                    </div>
                </div>


                <p className="mt-2 font-light text-gray-500">{data.description}</p>
                <div className="border-b-[1px] my-5"></div>
                <div className="font-bold text-[1.2rem] mt-2">₹ {data.price} <span className="font-light text-gray-500">MRP</span></div>


                <div className="flex gap-4 mt-10">
                    <button className="bg-orange-500 px-20 py-3 text-white rounded-xl hover:bg-orange-600" onClick={() => addToCart(data._id)}>Add to cart</button>

                    <button className="px-20 py-3 border border-orange-500 text-orange-500 rounded-xl hover:bg-orange-500 hover:text-white" onClick={() => { }}>Buy now</button>
                </div>
            </div>

            <div>


                <Transition appear show={isOpen} as={Fragment}>
                    <Dialog as="div" className="relative z-10" onClose={closeModal}>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-black bg-opacity-25" />
                        </Transition.Child>

                        <div className="fixed inset-0 overflow-y-auto">
                            <div className="flex min-h-full items-center justify-center p-4 text-center">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 scale-95"
                                    enterTo="opacity-100 scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 scale-100"
                                    leaveTo="opacity-0 scale-95"
                                >
                                    <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                        <Dialog.Title
                                            as="h3"
                                            className="text-lg font-medium leading-6 text-gray-900"
                                        >
                                            Share this product
                                        </Dialog.Title>
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-500">
                                                {data.name}
                                                <p id="prodlink">{`http://localhost:3000/${data.seo.slug}?prodId=${data._id}`}</p>
                                            </p>
                                        </div>

                                        <div className="mt-4">
                                            <button type="button" className="inline-flex justify-center rounded-md border border-transparent bg-orange-100 px-4 py-2 text-sm font-medium text-orange-700 hover:bg-orange-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2" onClick={closeModal}>
                                                Copy
                                            </button>
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition>
            </div>
        </div>
    )
}
