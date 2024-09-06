import { Button } from "keep-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Skeleton, SkeletonLine } from 'keep-react'

const LatestProducts = () => {
    const [latestProducts, setLatestProducts] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    useEffect(() => {
        setIsLoading(true)
        fetch("https://hayaecommerce-backend.vercel.app/latestProducts")
            .then(res => res.json())
            .then(data => {
                setIsLoading(false)
                setLatestProducts(data);
            })
    }, [])

    const navigate = useNavigate()
    const clickHandler = (id) => {
        navigate(`/products/${id}`)
    }
    return (
        <div>
            {
                isLoading ?
                    <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
                        <Skeleton className="w-full space-y-2.5 xl:max-w-md">
                            <SkeletonLine className="h-52 w-full" />
                            <SkeletonLine className="h-4 w-full" />
                            <SkeletonLine className="h-4 w-3/5" />
                            <SkeletonLine className="h-4 w-4/5" />
                            <SkeletonLine className="h-10 w-2/5" />
                        </Skeleton>
                        <Skeleton className="w-full space-y-2.5 xl:max-w-md">
                            <SkeletonLine className="h-52 w-full" />
                            <SkeletonLine className="h-4 w-full" />
                            <SkeletonLine className="h-4 w-3/5" />
                            <SkeletonLine className="h-4 w-4/5" />
                            <SkeletonLine className="h-10 w-2/5" />
                        </Skeleton>
                    </div> :
                    <div>
                        <h1 className=" mx-[15px] lg:mx-[75px] my-8 lg:my-14 text-2xl lg:text-4xl font-semibold">Latest Products</h1>
                        <div className="mx-[15px] lg:mx-[75px] my-8 lg:my-14">
                            <div className="grid grid-cols-2 lg:grid-cols-4 justify-between items-center gap-5">
                                {
                                    latestProducts &&
                                    latestProducts.map((product, i) => <div className="bg-[#CAAFAF] p-8 rounded-xl" key={i}>
                                        <div>
                                            <img className="w-[350px] h-[150px] md:h-[450px] lg:h-[450px]" src={product.images[0]} alt="" />
                                            <div className="text-center">
                                                <h1 className="text-sm my-1 lg:text-2xl font-semibold text-white">{product.name.length > 10 ? product.name.substring(0, 20) + "..." : product.name}</h1>
                                                <h1 className="text-white text-sm lg:text-3xl font-bold">{product.price}/=</h1>
                                                <div className="my-2">
                                                    <Button onClick={() => clickHandler(product._id)} className="bg-white rounded-full text-black font-bold hover:bg-[#CAAFAF] hover:text-white">Buy Now</Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>)
                                }
                            </div>
                        </div>
                    </div>
            }
            <div className="flex justify-center my-5">
                <Button onClick={()=>navigate('/products')} className="w-[200px] bg-black text-white hover:bg-white hover:text-black animate-pulse">See All</Button>
            </div>
        </div>
    );
};

export default LatestProducts;