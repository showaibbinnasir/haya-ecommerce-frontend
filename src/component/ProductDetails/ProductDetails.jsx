import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import {
    Button,
    Carousel,
    CarouselItem,
    CarouselSlides,
    Spinner,
    toast,
} from 'keep-react'
import { useContext, useEffect, useState } from "react";
import { Minus, Plus, ShoppingCart } from 'phosphor-react'
import { Label, NumberInput, NumberInputBox, NumberInputButton } from 'keep-react'
import { authContext } from "../../contextApi/AuthProvider";

import { TabContent, TabItem, TabList, Tabs } from 'keep-react'
import { Timeline, TimelineContent, TimelineItem, TimelinePoint } from 'keep-react'
import FeaturedProducts from "../FeaturedProducts/FeaturedProducts";
import Footer from "../Footer/Footer";
const ProductDetails = () => {
    const { pathname } = useLocation();
    const { user } = useContext(authContext)
    const [userInfo, setUserInfo] = useState("")
    useEffect(() => {
        fetch(`http://localhost:5000/users?email=${user?.email}`)
            .then(res => res.json())
            .then(data => setUserInfo(data))
    }, [user])
    console.log(userInfo[0]?.access);
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    const [selectedOption, setSelectedOption] = useState("");
    const [number, setNumber] = useState(1)
    // const [totalPrice, setTotalPrice] = useState(1)

    // Handle change event
    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    }
    const [isLoading, setIsLoading] = useState(false)
    const handleProduct = (product) => {
        setIsLoading(true)
        const cartProduct = { productId: product._id, productImage: product.images[0], productName: product.name, quantity: number, size: selectedOption, productPrice: product.price, totalPrice: totalPrice, customerName: user.displayName, userEmail: user.email, userPhone: userInfo[0]?.phoneNumber, confirm: false }
        fetch('http://localhost:5000/cart', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(cartProduct)
        })
            .then(res => res.json())
            .then(data => {
                if (data?.acknowledged == true) {
                    toast.success("Successfully added to the cart")
                    setIsLoading(false)

                } else {
                    toast.error("Sorry! Something went wrong.")
                    setIsLoading(false)

                }
            })
        console.log(cartProduct);
    }
    const navigate = useNavigate()
    const handleLoginButton = () => {
        navigate("/login")
    }
    const data = useLoaderData()
    const totalPrice = parseInt(data.price) * number
    const images = data.images
    document.title = `${data.name}`
    // console.log(data);
    return (
        <div className="bg-[#E0C6CB]">
            <div className="px-[75px] ">
                <div className=" pt-[100px] lg:mt-[0px] scale-100 lg:scale-75">
                    <Carousel options={{ slidesToScroll: 1 }}>
                        <CarouselSlides className="flex h-[250px] lg:h-[950px]">
                            {
                                images &&
                                images.map((slide, i) => (
                                    <CarouselItem key={i} className="flex lg:flex-[0_0_50%]">
                                        <div className="flex items-center justify-center rounded-xl border border-metal-100 bg-metal-50 w-full h-[250px] lg:h-[750px] dark:border-metal-900 dark:bg-metal-900">
                                            <img className="w-[350px] h-[250px] md:h-[450px] lg:h-[450px]" src={slide} alt="" />
                                        </div>
                                    </CarouselItem>
                                ))}
                        </CarouselSlides>

                    </Carousel>
                </div>
                <div className="flex justify-center">
                    <div className="mt-[50px] lg:mt-[-100px]">
                        <h1 className="text-2xl font-semibold">{data.name}</h1>
                        <h1 className="text-3xl font-semibold text-white">Price: {data.price}/= Taka</h1>
                    </div>
                </div>
                <div className="flex justify-center">
                    <div>
                        <div>
                            <h1 className="text-xl font-semibold my-2">Available Size: </h1>
                            <div>
                                <label className="flex items-center space-x-2">
                                    <input
                                        type="radio"
                                        value="S"
                                        checked={selectedOption === "S"}
                                        onChange={handleOptionChange}
                                        className="form-radio h-5 w-5 text-blue-600"
                                    />
                                    <span className="text-lg">S</span>
                                </label>

                                <label className="flex items-center space-x-2">
                                    <input
                                        type="radio"
                                        value="M"
                                        checked={selectedOption === "M"}
                                        onChange={handleOptionChange}
                                        className="form-radio h-5 w-5 text-blue-600"
                                    />
                                    <span className="text-lg">M</span>
                                </label>

                                <label className="flex items-center space-x-2">
                                    <input
                                        type="radio"
                                        value="L"
                                        checked={selectedOption === "L"}
                                        onChange={handleOptionChange}
                                        className="form-radio h-5 w-5 text-blue-600"
                                    />
                                    <span className="text-lg">L</span>
                                </label>
                            </div>
                        </div>
                        <div>
                            <h1 className="text-xl font-semibold my-2">Enter Quantity: </h1>
                            <div>
                                <fieldset className="space-y-1">
                                    <Label>Choose Number</Label>
                                    <NumberInput>
                                        <NumberInputButton disabled={number === 0} onClick={() => setNumber((prev) => prev - 1)}>
                                            <Minus size={16} color="#455468" />
                                        </NumberInputButton>
                                        <NumberInputBox min={0} max={100} value={number} onChange={(e) => setNumber(+e.target.value)} />
                                        <NumberInputButton disabled={number === 100} onClick={() => setNumber((prev) => prev + 1)}>
                                            <Plus size={16} color="#455468" />
                                        </NumberInputButton>
                                    </NumberInput>
                                    <p className="text-body-4 font-normal text-metal-600 dark:text-metal-300">Number Must be between 1 to 100</p>
                                </fieldset>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    {
                        user ?
                            <div className="flex justify-center py-5">
                                {
                                    userInfo[0]?.access ?
                                        <div>
                                            {
                                                isLoading ?
                                                    <Button className="bg-white w-[350px] rounded-full text-black hover:bg-black hover:text-white" ><div className="flex items-center gap-3">
                                                        <ShoppingCart size={24} color="#4d4747" />
                                                        <Spinner color="info" size="lg" />
                                                    </div></Button> :
                                                    <Button onClick={() => handleProduct(data)} className="bg-white w-[350px] rounded-full text-black hover:bg-black hover:text-white" ><div className="flex items-center gap-3">
                                                        <ShoppingCart size={24} color="#4d4747" />
                                                        <h1>Add to cart</h1>
                                                    </div></Button>
                                            }
                                        </div> :
                                        <h1 className="text-red-600">Your account is terminated</h1>
                                }
                            </div> :
                            <div className="flex justify-center py-5">

                                <div>
                                    <Button onClick={handleLoginButton} className="bg-white w-[350px] rounded-full text-black hover:bg-black hover:text-white" >Login to buy</Button>
                                </div>

                            </div>
                    }
                </div>
                <div className="py-5">
                    <Tabs variant="underline" defaultActive="5" className="mx-auto max-w-xl">
                        <TabList>
                            <TabItem value="5">

                                <div className="font-semibold">Description</div>
                            </TabItem>
                            <TabItem value="6">

                                <div className="font-semibold">Additional Info</div>
                            </TabItem>

                        </TabList>
                        <TabContent value="5">
                            {
                                data?.description.map((des, i) => <div key={i}>
                                    <Timeline>
                                        <TimelineItem>
                                            <TimelinePoint />
                                            <TimelineContent>

                                                <h1 className="text-body-3 font-medium text-metal-900 dark:text-white">{des}</h1>

                                            </TimelineContent>
                                        </TimelineItem>
                                    </Timeline>
                                </div>)
                            }
                        </TabContent>
                        <TabContent value="6">
                            <h1 className="text-lg font-semibold">{data?.addinfo}</h1>
                        </TabContent>

                    </Tabs>
                </div>

            </div>
            <div>
                <FeaturedProducts></FeaturedProducts>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default ProductDetails;