"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { RxCross2 } from 'react-icons/rx';

export default function Page() {

    const [cart, setCart] = useState([]); // [ {productId: ""} ]
    const [selected, setSelected] = useState([]);
    const [checkbox, setCheckbox] = useState({});
    const [price, setPrice] = useState(0);
    const router = useRouter();

    const { data: session, status } = useSession({
        required: true,
        onUnauthenticated() {
            window.location.href = "/login";
        }
    });

    const initiatePayment = async () => {
        // Handle payment
        router.push("/checkout");
    };

    const selectProduct = (prodId) => {
        const item = cart.find((item) => item._id === prodId);

        if (item === undefined) {
            return;
        } else {
            const index = selected.findIndex((item) => item._id === prodId);
            if (index === -1) {
                setSelected([...selected, item]);
                checkbox[prodId] = true;
                const newTotal = price + item.price;
                setPrice(newTotal);
            } else {
                checkbox[prodId] = false;
                const newSelected = [...selected];
                newSelected.splice(index, 1);
                setSelected(newSelected);
                const newTotal = price - item.price;
                setPrice(newTotal);
            }
        }
    };

    const fetchCart = async () => {
        let totalPrice = 0;
        try {

            const response = await fetch('/api/user/cart/getCart');

            if (response.ok) {
                const data = await response.json();
                setCart(data);
                setSelected(data);
                data.map((item) => {
                    const id = item._id;
                    let tempData = checkbox;
                    let data = Object.assign(tempData, { [id]: true });
                    totalPrice += item.price;
                    setCheckbox(data);
                });
            } else {
                console.error('API request failed');
            }
        } catch (error) {
            console.error('An error occurred', error);
        }
        setPrice(totalPrice);
    }

    const removeProduct = async (prodId) => {
        // Handle remove product
        let totalPrice = 0;
        const main = document.getElementById("main" + prodId);
        // main.style.display = "none";
        main.classList.add("opacity-60");
        try {
            const response = await fetch('/api/user/cart/removeCart',
                {
                    method: 'POST',
                    body: JSON.stringify({ prodId }),
                });

            if (response.ok) {
                const data = await response.json();
                setCart(data);
                setSelected(data);
                data.map((item) => {
                    const id = item._id;
                    let tempData = checkbox;
                    let data = Object.assign(tempData, { [id]: true });
                    totalPrice += item.price;
                    setCheckbox(data);
                });
            } else {
                console.error('API request failed');
            }
        } catch (error) {
            console.error('An error occurred', error);
        }
        setPrice(totalPrice);
    }


    useEffect(() => {
        fetchCart();
    }, [status, session]);

    return (
        <div className="h-screen flex">
            {/* <div className="font-semibold text-3xl">Cart Items ({cart.length})</div>
            <div>
                {cart && cart.map((item) => (
                    <div id={"main" + item._id} className="border-amber-500 border p-4 m-4 flex flex-row transition-opacity duration-500 ease-in-out shadow-lg bg-amber-50" key={item._id}>
                        <Image src={item.images[0]} alt={item.name} width={200} height={200} />
                        <div className="flex justify-around align-baseline">
                            <div>
                                <div className="m-2 p-2"><h2>{item.name}</h2></div>
                                <div className="m-2 p-2"><h2>{item.price}</h2></div>
                                <div className="m-2 p-2"><h2>{item.stock}</h2></div>
                            </div>
                            <div className="flex items-center mb-4">
                                <input id={item._id} type="checkbox" onClick={(e) => selectProduct(item._id)} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" checked={checkbox[item._id]} />
                                <button id={item._id} type="button" className="ml-2 text-sm text-gray-500 underline hover:text-gray-700" onClick={() => removeProduct(item._id)}>Remove</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="border-amber-300 border shadow-sm py-5 mx-4 pl-4 mb-8">
                <div><h2>Order Total: {price}</h2></div>
                <div><h2>Shipping: Free</h2></div>
                <div><h2>Subtotal: {price}</h2></div>
            </div>
            <div className="h-5 bg-blue-100 flex items-center justify-center py-5 border border-blue-700 mb-8 mx-4 bg-opacity-100">
                <button onClick={() => initiatePayment()}>Place Order</button>
            </div>
            <button onClick={() => console.log(selected)}>Check</button> */}
            <div className="flex h-full w-full mt-32">
                <div className="w-3/6 h-screeen flex flex-col items-center gap-4">
                    <div className="w-[40rem] h-[10rem] border flex items-center justify-around gap-8 p-2 rounded-lg">
                        <div className="bg-gray-200 w-[8rem] h-[8rem] rounded-lg"></div>
                        <h3 className="font-semibold text-xl">BedSheet</h3>
                        <div className="border w-[8rem] h-[2rem] rounded-full flex items-center justify-between p-4">
                            <button className=" font-normal text-[1.5rem]">+</button>
                            <div className="text-[1.2rem]">1</div>
                            <button className=" font-normal text-[1.5rem]">-</button>
                        </div>
                        <div>₹ 250</div>
                        <button className=" text-red-500"><RxCross2 size={25}/></button>
                    </div>
                    <div className="w-[40rem] h-[10rem] border flex items-center justify-around gap-8 p-2 rounded-lg">
                        <div className="bg-gray-200 w-[8rem] h-[8rem] rounded-lg"></div>
                        <h3 className="font-semibold text-xl">BedSheet</h3>
                        <div className="border w-[8rem] h-[2rem] rounded-full flex items-center justify-between p-4">
                            <button className=" font-normal text-[1.5rem]">+</button>
                            <div className="text-[1.2rem]">1</div>
                            <button className=" font-normal text-[1.5rem]">-</button>
                        </div>
                        <div>₹ 250</div>
                        <button className=" text-red-500"><RxCross2 size={25}/></button>
                    </div>
                    <div className="w-[40rem] h-[10rem] border flex items-center justify-around gap-8 p-2 rounded-lg">
                        <div className="bg-gray-200 w-[8rem] h-[8rem] rounded-lg"></div>
                        <h3 className="font-semibold text-xl">BedSheet</h3>
                        <div className="border w-[8rem] h-[2rem] rounded-full flex items-center justify-between p-4">
                            <button className=" font-normal text-[1.5rem]">+</button>
                            <div className="text-[1.2rem]">1</div>
                            <button className=" font-normal text-[1.5rem]">-</button>
                        </div>
                        <div>₹ 250</div>
                        <button className=" text-red-500"><RxCross2 size={25}/></button>
                    </div>
                    
                </div>
                <div className="w-3/6 border h-screen">
                    cart
                </div>
            </div>
        </div>
    )
}
