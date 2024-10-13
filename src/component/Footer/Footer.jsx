import facebok from "../../assets/facebook.png"
import group from "../../assets/group.png"
import insta from "../../assets/insta.png"
import whatsapp from "../../assets/whatsapp.png"
import haya from "../../assets/haya.png"
import { ArrowRight } from "phosphor-react"
import { useNavigate } from "react-router-dom"

const Footer = () => {
    const navigate = useNavigate()
    const handleSubCategory = (name) => {
        navigate(`/productList/${name}`)
    }
    return (
        <div>
            <div className="bg-white p-5">
                <div className="flex justify-center">
                    <div className="flex items-center gap-5">
                        <img src={facebok} alt="" />
                        <img src={insta} alt="" />
                        <img src={whatsapp} alt="" />
                        <img src={group} alt="" />
                    </div>
                </div>
            </div>
            <div className="bg-black flex justify-center p-10">
                <div className="flex flex-col lg:flex-row items-center gap-9">
                    <div>
                        <div className="mb-3">
                            <img className=" w-[100px] lg:w-[150px]" src={haya} alt="" />
                        </div>
                        <div className="w-[350px] lg:w-[450px]">
                            <div onClick={()=>navigate('/contact')} className="bg-white rounded-lg cursor-pointer hover:bg-black hover:text-white ease-in-out">
                                <div className="flex justify-between px-5 py-2">
                                    <h1>Email us now</h1>
                                    <ArrowRight size={32} />
                                </div>
                            </div>
                            <h1 className="text-sm text-gray-300">By mailing us you're accepting our privacy and policy</h1>
                        </div>
                    </div>
                    <div className="">
                        <h1 className="text-white text-xl font-semibold">Links</h1>
                        <div className="text-white">
                            <h1 onClick={()=>navigate('/')} className="hover:border-b-2">Home</h1>
                            <h1 onClick={()=>handleSubCategory("Man's Product")} className="cursor-pointer hover:border-b-2">Mens Products</h1>
                            <h1 onClick={()=>handleSubCategory("Woman's Product")} className="cursor-pointer hover:border-b-2">Womens Products</h1>
                            <h1 onClick={()=>handleSubCategory("Kid's Product")} className="cursor-pointer hover:border-b-2">Kids Products</h1>
                            <h1 onClick={()=>navigate('/contact')} className="cursor-pointer hover:border-b-2">Contact us</h1>
                        </div>

                    </div>
                    <div>
                        <div className="mb-3">
                            <h1 className="text-2xl text-white">Address</h1>
                        </div>
                        <div className="text-white w-[350px] lg:w-[450px]">
                            <h1>Office-display Center:</h1>
                            <h1>House-32, 2nd floor, Road- 08, Block- H, Mirpur 2,
                                Dhaka,1216 ,Bangladesh. 01799837336 ,
                                01812630083</h1>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-center bg-black p-2 text-white">
                <h1>© Haya 2024 | DreamWeave Stations</h1>
            </div>
        </div>
    );
};

export default Footer;