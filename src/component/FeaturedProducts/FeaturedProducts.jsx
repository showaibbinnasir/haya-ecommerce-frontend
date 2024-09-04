import { Button } from "keep-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Skeleton, SkeletonLine } from 'keep-react'


const FeaturedProducts = () => {
    const [featuredProducts, setFeaturedProducts] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    useEffect(() => {
        setIsLoading(true)
        fetch("https://hayaecommerce-backend.vercel.app/featuredProducts")
            .then(res => res.json())
            .then(data => {
                setIsLoading(false)
                setFeaturedProducts(data);

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
                        <h1 className=" mx-[15px] lg:mx-[75px] my-8 lg:my-14 text-2xl lg:text-4xl font-semibold">Featured Products</h1>
                        <div className="mx-[15px] lg:mx-[75px] my-8 lg:my-14">
                            <div className="grid grid-cols-2 lg:flex items-center gap-5">
                                {
                                    featuredProducts &&
                                    featuredProducts.map((product, i) => <div className="bg-[#CAAFAF] p-8 rounded-xl" key={i}>
                                        <div>
                                            <img className="w-[350px] h-[150px] lg:h-[450px]" src={product.images[0]} alt="" />
                                            <div className="text-center">
                                                <h1 className="text-md lg:text-2xl font-semibold text-white">{product.name.length > 10 ? product.name.substring(0, 30) + "..." : product.name}</h1>
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
        </div>
    );
};

export default FeaturedProducts;
// haya-ecommerce
// ud1PFYqjW3UAZZWO