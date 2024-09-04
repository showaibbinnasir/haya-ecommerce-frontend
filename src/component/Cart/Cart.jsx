import { useContext, useState } from "react";
import { authContext } from "../../contextApi/AuthProvider";
import { Button, Divider, Spinner, toast } from "keep-react";
import { Minus } from "phosphor-react";
import { useQuery } from "react-query";
import ReactWhatsapp from "react-whatsapp";



const Cart = () => {
    document.title = "Cart"
    const { user } = useContext(authContext)
    const { data: cartData = [], refetch } = useQuery({
        queryKey: ['data'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/cart?email=${user.email}`)
            const data = await res.json();
            return data;
        }
    })
    const totalSum = cartData.reduce((sum, product) => sum + product.totalPrice, 0);
    const [isLoading, setIsLoading] = useState(false)
    const handleDeleteButton = (id) => {
        setIsLoading(true)
        fetch(`http://localhost:5000/deletecart/${id}`, {
            method: "DELETE"
        })
            .then(res => res.json())
            .then(data => {
                refetch()
                setIsLoading(false)
                toast.success("Cart Updated!")
            })
    }
    const handleOrder = () => {
        const data = cartData.map(({ _id, ...rest }) => rest);
        fetch('http://localhost:5000/orders', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                if (data?.acknowledged == true) {
                    toast.success("Listed successfully!")

                } else {
                    toast.error("Sorry! Something went wrong.")

                }
            })

    }
    const formattedMessage = cartData.map((order, index) => {
        return `${index + 1}. Product Name: ${order.productName}\n   Quantity: ${order.quantity}\n   Size: ${order.size}\n   Total Price: ${order.totalPrice}\n   Customer Name: ${order.customerName}\n   Email: ${order.userEmail}${order.userPhone ? `\n   Phone: ${order.userPhone}` : ""}`;
    }).join("\n\n");
    return (
        <div className="mx-[15px] lg:mx-[75px]">
            <h1 className="text-3xl text-center font-semibold my-5">Total items : {cartData?.length}</h1>
            <div>
                <h1 className="text-2xl font-semibold text-center">Cart</h1>
                <div className="flex flex-col gap-5 my-5">
                    {
                        cartData &&
                        cartData?.map((product, i) => <div key={i}>
                            <div className="flex justify-center">
                                <div className="flex justify-between gap-5 items-center">
                                    <div className="flex gap-10 items-center">
                                        <div className="flex gap-5 items-center">
                                            <div>
                                                <img className="w-[150px]" src={product.productImage} alt="" />
                                            </div>
                                            <div>
                                                <h1 className="text-md lg:text-xl font-bold">{product.productName}</h1>
                                                <h1 className="font-semibold">Price: {parseInt(product.productPrice)}</h1>
                                                <h1>Quantity: {product.quantity}</h1>
                                            </div>
                                        </div>
                                        <div>
                                            <div>
                                                <h1 className="text-sm lg:text-xl font-semibold">Total price : {product.quantity * parseInt(product.productPrice)}</h1>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        {
                                            isLoading ?
                                                <Button style={{ backgroundColor: "red" }}><Spinner color="info" size="lg" /></Button> :
                                                <Button onClick={() => handleDeleteButton(product?._id)} style={{ backgroundColor: "red" }}><Minus size={16}></Minus></Button>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>)
                    }
                </div>
            </div>
            <Divider></Divider>
            <div className="py-5">
                <h1 className="text-3xl text-right">Total price : {totalSum}</h1>
            </div>
            <div className="flex justify-center my-5">

                {
                    cartData?.length === 0 ?
                        <h1 className="text-xl font-semibold">No products are available in cart</h1> :
                        <Button onClick={handleOrder} className="bg-black text-white w-[150px]"><ReactWhatsapp number="+8801880614408" message={formattedMessage}> Confirm Orders</ReactWhatsapp></Button>
                }
            </div>
        </div>
    );
};

export default Cart;