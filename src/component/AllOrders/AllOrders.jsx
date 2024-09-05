import { useQuery } from "react-query";
import Footer from "../Footer/Footer";
import { Button, toast } from "keep-react";

const AllOrders = () => {
    document.title = "Orders"
    const { data: ordata = [],refetch } = useQuery({
        queryKey: ['data'],
        queryFn: async () => {
            const res = await fetch(`https://hayaecommerce-backend.vercel.app/allorders`)
            const data = await res.json();
            return data;
        }
    })
    window.location.refetch

    const handleDeliverButton = (id) => {
        const confirm = true;
            const verify = { confirm };
            fetch(`https://hayaecommerce-backend.vercel.app/deliver/update/${id}`, {
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
                    refetch()
                })
    }
    return (
        <div>
            <div className=" bg-[#E0C6CB] px-[15px] lg:px-[75px] py-[15px]">
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
                                    <h1 className="text-md lg:text-2xl font-semibold text-white">{product?.productName.length > 10 ? product?.productName.substring(0, 30) + "..." : product?.productName}</h1>
                                    <h1 className="text-white text-lg lg:text-3xl font-bold">{product?.productPrice}/= Taka</h1>
                                    <h1 className="text-white text-lg lg:text-xl font-bold">Quantity : {product?.quantity}</h1>
                                    <h1 className="text-white text-lg lg:text-xl font-bold">Total : {product?.totalPrice}</h1>
                                    <h1 className="text-white text-lg lg:text-xl font-bold">Name : {product?.customerName}</h1>
                                    <h1 className="text-white text-lg lg:text-xl font-bold">Phone : {product?.userPhone}</h1>

                                </div>
                            </div>
                            <div className="flex justify-center">
                                {
                                    product?.confirm ?
                                        <Button className="bg-green-500 text-white w-[150px]">Delivered</Button> :
                                        <Button onClick={()=>handleDeliverButton(product?._id)} className="bg-white text-black w-[150px] hover:bg-green-500">Deliver</Button>

                                }
                            </div>
                        </div>)
                    }
                </div>

            </div>
            <Footer></Footer>
        </div>
    );
};

export default AllOrders;