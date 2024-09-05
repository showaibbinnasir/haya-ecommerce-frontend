import { useContext } from "react";
import { authContext } from "../../contextApi/AuthProvider";
import { useQuery } from "react-query";
import Footer from "../Footer/Footer";

const Orders = () => {
    document.title = "Orders"
    const { user } = useContext(authContext)
    const { data: ordata = [] } = useQuery({
        queryKey: ['data'],
        queryFn: async () => {
            const res = await fetch(`https://hayaecommerce-backend.vercel.app/allorders?mail=${user.email}`)
            const data = await res.json();
            return data;
        }
    })
    window.location.refetch
    return (
        <div>
            <div className=" bg-[#E0C6CB] px-[15px] lg:px-[75px] py-5">
                <div className="">
                    <h1 className="text-2xl text-center font-semibold py-5">Orders</h1>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-4 justify-between items-center gap-5">
                    {
                        ordata &&
                        ordata?.map((product, i) => <div className={product?.confirm ? 'bg-green-600 p-8 rounded-xl' : 'bg-[#CAAFAF] p-8 rounded-xl'} key={i}>
                            <div>
                                <img className="w-[350px] h-[150px] md:h-[450px] lg:h-[450px]" src={product?.productImage} alt="" />
                                <div className="text-center">
                                    <h1 className="text-sm my-1 lg:text-2xl font-semibold text-white">{product?.productName.length > 10 ? product?.productName.substring(0, 20) + "..." : product?.productName}</h1>
                                    <h1 className="text-white text-lg lg:text-3xl font-bold">{product?.productPrice}/= Taka</h1>
                                    <h1 className="text-white text-lg lg:text-xl font-bold">Quantity : {product?.quantity}</h1>
                                    <h1 className="text-white text-lg lg:text-xl font-bold">Total : {product?.totalPrice}</h1>

                                </div>
                            </div>
                        </div>)
                    }
                </div>

            </div>
            <Footer></Footer>
        </div>

    );
};

export default Orders;