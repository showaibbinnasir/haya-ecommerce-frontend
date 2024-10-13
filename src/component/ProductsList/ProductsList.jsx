import { Button } from "keep-react";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import Footer from "../Footer/Footer";
import { useEffect } from "react";

const ProductsList = () => {
    const data = useLoaderData()
    const navigate = useNavigate()
    const clickHandler = (id) => {
        navigate(`/products/${id}`)
    }
    const params = window.location.pathname;
    // Decode the URI component to handle special characters like %20 (space)
    const decodedPathname = decodeURIComponent(params);

    // Split the path by '/'
    const pathSegments = decodedPathname.split('/');

    // Get the last segment
    const lastParameter = pathSegments[pathSegments.length - 1];

    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    document.title = "Haya | Products"
    return (
        <div className="bg-[#E0C6CB]">
            <div className="text-2xl text-center py-3">Search result of : {lastParameter}</div>
            {
                data ?
                    <div className="grid grid-cols-2 lg:grid-cols-4 justify-between items-center gap-5 mx-[15px] lg:mx-[75px]">
                        {
                            data &&
                            data?.map((product, i) => <div key={i}>
                                <div>
                                    <div className="my-3 lg:my-5">
                                        <div className="bg-[#CAAFAF] p-8 rounded-xl">
                                            <div>
                                                <img className=" object-cover w-[350px] h-[150px] md:h-[450px] lg:h-[450px]" src={product.images[0]} alt="" />
                                                <div className="text-center">
                                                    <h1 className="text-sm my-1 lg:text-2xl font-semibold text-white">{product.name.length > 10 ? product.name.substring(0, 15) + "..." : product.name}</h1>
                                                    {
                                                        product?.available ?
                                                            <h1 className="text-white text-sm lg:text-3xl font-bold">{product.price}$</h1>
                                                            :
                                                            <h1 className="border scale-75 bg-red-500 border-red-500 m-[-4px] p-2 text-white rounded-lg text-[14px] lg:text-[18px]">This product is out of stock now</h1>
                                                    }
                                                    <div className="my-2">
                                                        <Button onClick={() => clickHandler(product._id)} className="bg-white rounded-full text-black font-bold hover:bg-[#CAAFAF] hover:text-white">Buy Now</Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>)
                        }
                    </div> :
                    <div> No products are available to show</div>
            }
            <Footer></Footer>

        </div>
    );
};

export default ProductsList;