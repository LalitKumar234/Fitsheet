import Image from "next/image";
import Link from "next/link";
import { AiFillHeart } from 'react-icons/ai';

export default function Card({ result }) {
    return (
        <div className="rounded-md">
            <Link href={`/${result.seo.slug}?prodId=${result._id}`}>
                <div className="relative">
                    <div className="flex items-center gap-2 absolute top-4 right-4 text-orange-100 bg-orange-400 backdrop-blur py-1 px-3 text-sm rounded">
                        <AiFillHeart size={20} />
                        {result.likes}
                    </div>
                    <Image src={result.images[0]}
                        width={300}
                        height={300}
                        className="prodImage"
                        style={{ objectFit: "cover", borderRadius: '10px' }}
                        blurDataURL="data:image/png;base64,i VBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADjQH8mF3H4QAAAABJRU5ErkJggg=="
                        alt="Image not available" />
                </div>
                <div className="flex items-center mt-4 justify-between">
                    <h2 className="font-medium">{result.name}</h2>
                    <h3 className="font-semibold text-orange-400">₹ {result.price}</h3>
                    {/* <h3 className="text-sm">Rs{result.description}</h3> */}
                    {/* <h3 className="text-sm">{result.likes}</h3> */}
                </div>
            </Link>
        </div>
    )
}
