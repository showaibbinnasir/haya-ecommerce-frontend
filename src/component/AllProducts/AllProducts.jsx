import { Button, Spinner, toast } from "keep-react";
import { useContext, useState } from "react";
import { useQuery } from "react-query";
import { authContext } from "../../contextApi/AuthProvider";

const AllProducts = () => {
    // const [products, setProducts] = useState("")
    const { user } = useContext(authContext)
    const [featuredProducts, setFeaturedProducts] = useState([])
    // useEffect(() => {
    //     fetch('https://hayaecommerce-backend.vercel.app/allProducts')
    //         .then(res => res.json())
    //         .then(data => {

    //             setProducts(data)
    //             const featuredProducts = products.filter(product => product.featuredProduct);
    //             setFeaturedProducts(featuredProducts)

    //         })
    // }, [products])
    document.title = "Haya | All Products"
    const { data: products = [], refetch, isLoading } = useQuery({
        queryKey: ['data'],
        queryFn: async () => {
            const res = await fetch(`https://hayaecommerce-backend.vercel.app/allProducts`)
            const data = await res.json();
            const featuredProductsList = data?.filter(product => product?.featuredProduct);
            setFeaturedProducts(featuredProductsList)
            return data;
        }
    })
    const [falseIsLoading, setFalseIsLoading] = useState(false)
    const handleFeaturedFalse = id => {
        setFalseIsLoading(true)
        const featuredProduct = false;
        const verify = { featuredProduct };
        fetch(`https://hayaecommerce-backend.vercel.app/allPost/featuredfalse/update/${id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(verify)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                toast.success(`Updated Successfully`)
                setFalseIsLoading(false)
                refetch()
            })
    }
    const [trueIsLoaing, setTrueIsLoading] = useState(false)
    const handleFeaturedTrue = id => {
        setTrueIsLoading(true)
        if (featuredProducts?.length >= 4) {
            toast.error("You have reached to the maximum level of featured products!")
        } else {
            const featuredProduct = true;
            const verify = { featuredProduct };
            fetch(`https://hayaecommerce-backend.vercel.app/allPost/featuredtrue/update/${id}`, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(verify)
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    toast.success(`Updated Successfully`)
                    setTrueIsLoading(false)
                    refetch()
                })
        }
    }


    return (
        <div>
            <div className="text-center my-5">
                <h1 className="text-4xl font-semibold">Total Products : {products?.length}</h1>
                <h1 className="text-xl font-medium">Featured Products : {featuredProducts?.length}</h1>
                <h1 className="text-green-600">Note : Green cards are featured products</h1>
            </div>
            <div>


                <div>
                    <div className="mx-[10px] lg:mx-[75px] my-8 lg:my-14">
                        <div className="grid grid-cols-2 lg:grid-cols-4 justify-between items-center gap-5">
                            {
                                products &&
                                products?.map((product, i) => <div className={product?.featuredProduct ? 'bg-green-600 p-8 rounded-xl' : 'bg-[#CAAFAF] p-8 rounded-xl'} key={i}>
                                    <div>
                                        <img className="w-[350px]" src={product?.images[0]} alt="" />
                                        <div className="text-center">
                                            <h1 className="text-md lg:text-2xl font-semibold text-white">{product?.name.length > 10 ? product?.name.substring(0, 30) + "..." : product?.name}</h1>
                                            <h1 className="text-white text-lg lg:text-3xl font-bold">{product?.price}/= Taka</h1>
                                            <div className="my-2 flex justify-center">
                                                <div className="flex flex-col lg:flex-row gap-2">
                                                    <Button className="bg-red-500 rounded-full text-white font-bold hover:bg-[#CAAFAF] hover:text-white">Delete Post</Button>
                                                    <Button className="bg-black rounded-full text-white font-bold hover:bg-white hover:text-black">Edit Post</Button>
                                                    {
                                                        product?.featuredProduct &&
                                                        product?.featuredProduct ?
                                                            falseIsLoading ?
                                                                <Button className="bg-white rounded-full text-black font-bold hover:bg-black hover:text-white"><Spinner color="info" size="lg" /></Button> :
                                                                <Button onClick={() => handleFeaturedFalse(product?._id)} className="bg-white rounded-full text-black font-bold hover:bg-black hover:text-white">Featured</Button> :
                                                            trueIsLoaing ?
                                                                <Button className="bg-cyan-400 rounded-full text-white font-bold hover:bg-white hover:text-black"><Spinner color="info" size="lg" /></Button> : 
                                                                <Button onClick={() => handleFeaturedTrue(product?._id)} className="bg-cyan-400 rounded-full text-white font-bold hover:bg-white hover:text-black">Feature</Button>
                                                    }

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>)
                            }
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AllProducts;